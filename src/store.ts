/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { User } from './app/auth/shared/services/auth/auth.service';
import { Meal } from './app/health/shared/services/meals/meals.service';

export interface State {
  user: User | null;
  meals: Meal[] | null;
  [key: string]: any;
}

const state: State = {
  user: null,
  meals: null,
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

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
