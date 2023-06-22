import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '../../../../../store';
import { catchError, of } from 'rxjs';

export interface User {
  email: string | null;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.angularFireAuth.authState.pipe(
    tap(next => {
      if (!next) return this.store.set('user', null);

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };

      this.store.set('user', user);
    })
  );

  constructor(private angularFireAuth: AngularFireAuth, private store: Store) {}

  get user() {
    return this.angularFireAuth.user;
  }

  get authState() {
    return this.angularFireAuth.authState;
  }

  createUser(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.angularFireAuth.signOut();
  }
}
