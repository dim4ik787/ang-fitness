/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { User } from './app/auth/shared/services/auth/auth.service';
import { Meal } from './app/health/shared/services/meals/meals.service';
import { Workout } from './app/health/shared/services/workouts/workouts.service';
import { ScheduleItem } from './app/health/shared/services/schedule/schedule.service';

export interface State {
  user: User | null;
  meals: Meal[] | null;
  workouts: Workout[] | null;
  date: Date | null;
  list: any;
  schedule: ScheduleItem[] | null;
  [key: string]: any;
}

const state: State = {
  user: null,
  meals: null,
  workouts: null,
  date: null,
  schedule: null,
  list: null,
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(map((item: State) => item[name]));
  }

  set(name: string, state: unknown) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
