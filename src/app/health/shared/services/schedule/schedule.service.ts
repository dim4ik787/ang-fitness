import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, switchMap, tap } from 'rxjs';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
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

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();

  selected$ = this.section$.pipe(tap(next => this.store.set('selected', next)));

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((next: Date) => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap((date: any) => {
      return this.getSchedule(date.startAt, date.endAt);
    }),
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
    map((value: any) => this.store.value[value.type]),
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

  selectSection(section: any) {
    this.section$.next(section);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid =>
        this.angularFireDatabase
          .list(`schedule/${uid}`, ref =>
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
}
