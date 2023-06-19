import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<unknown[]> = this.authService.user.pipe(
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
}
