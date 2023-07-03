import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists?: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class MealsService {
  meals$ = this.authService.user.pipe(
    switchMap(user => this.angularFireDatabase.list(`meals/${user?.uid}`).snapshotChanges()),
    map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return { ...(data as object), $key: key };
      });
    }),
    tap(next => {
      this.store.set('meals', next);
    })
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  getMeal(key: string): Observable<Meal> {
    if (!key) return of({} as Meal);
    return this.store.select<Meal[]>('meals').pipe(
      filter(meals => !!meals),
      map(meals => meals.find(meal => meal.$key === key) || ({} as Meal))
    );
  }

  addMeal(meal: Meal) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.list(`meals/${uid}`).push(meal))
    );
  }

  updateMeal(meal: Meal) {
    const { $key, ...updateData } = meal;
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.object(`meals/${uid}/${$key}`).update(updateData))
    );
  }

  removeMeal(key: string) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.list(`meals/${uid}`).remove(key))
    );
  }
}
