import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Workout {
  name: string;
  type: string;
  strength: {
    reps: number;
    sets: number;
    weight: number;
  };
  endurance: {
    distance: number;
    duration: number;
  };
  timestamp: number;
  $key: string;
  $exists?: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class WorkoutsService {
  workouts$ = this.authService.user.pipe(
    switchMap(user => this.angularFireDatabase.list(`workouts/${user?.uid}`).snapshotChanges()),
    map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return { ...(data as object), $key: key };
      });
    }),
    tap(next => {
      this.store.set('workouts', next);
    })
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  getWorkout(key: string): Observable<Workout> {
    if (!key) return of({} as Workout);
    return this.store.select<Workout[]>('workouts').pipe(
      filter(workouts => !!workouts),
      map(workouts => workouts.find(workout => workout.$key === key) || ({} as Workout))
    );
  }

  addWorkout(workout: Workout) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.list(`workouts/${uid}`).push(workout))
    );
  }

  updateWorkout(workout: Workout) {
    const { $key, ...updateData } = workout;
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid =>
        this.angularFireDatabase.object(`workouts/${uid}/${$key}`).update(updateData)
      )
    );
  }

  removeWorkout(key: string) {
    return this.authService.user.pipe(
      map(user => user?.uid),
      switchMap(uid => this.angularFireDatabase.list(`workouts/${uid}`).remove(key))
    );
  }
}
