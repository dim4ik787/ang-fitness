import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from 'store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SelectedSection } from 'src/app/health/schedule/components/schedule-section/schedule-section.component';

export interface ScheduleItem {
  meals: string[] | null;
  workouts: string[] | null;
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: unknown;
}

export interface ISelectedData {
  type: string;
  assigned: Array<string>;
  section: string;
  triggeredElement: HTMLElement;
  day: Date;
  data: ScheduleItem;
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject<ISelectedData>();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    switchMap(([items, section]: any) => {
      const sectionId = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(sectionId ? section.data : defaults),
        ...items,
      };

      if (sectionId) {
        delete payload.$key;

        return this.updateSection(sectionId, payload);
      } else return this.createSection(payload);
    })
  );

  selected$: Observable<ISelectedData> = this.section$.pipe(
    tap(next => this.store.set('selected', next))
  );

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((next: Date) => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(date => {
      return this.getSchedule(date.startAt, date.endAt);
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap(next => this.store.set('schedule', next))
  );

  list$ = this.section$.pipe(
    map((value: ISelectedData) => this.store.value[value.type]),
    tap(next => this.store.set('list', next))
  );

  constructor(
    private store: Store,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(section: ISelectedData) {
    this.section$.next(section);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid =>
        this.angularFireDatabase
          .list<object>(`schedule/${uid}`, ref =>
            ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
          )
          .snapshotChanges()
      ),
      map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return { ...(data as object), $key: key };
        });
      })
    );
  }

  private updateSection(key: string, data: ScheduleItem) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.object(`schedule/${uid}/${key}`).update(data))
    );
  }

  private createSection(data: ScheduleItem) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.list(`schedule/${uid}`).push(data))
    );
  }
}
