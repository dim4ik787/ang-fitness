import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseOptions } from '@angular/fire/app/firebase';

import { SharedModule } from './shared/shared.module';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyA1KWqrNo6DX-UL6H9pI6KkrxFIrc0qVdQ',
  authDomain: 'ang-fintess-1.firebaseapp.com',
  databaseURL: 'https://ang-fintess-1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ang-fintess-1',
  storageBucket: 'ang-fintess-1.appspot.com',
  messagingSenderId: '1018824253747',
  appId: '1:1018824253747:web:dd2af7249155e8d4a1de46',
};

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then(module => module.RegisterModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
  declarations: [],
  providers: [],
})
export class AuthModule {}
