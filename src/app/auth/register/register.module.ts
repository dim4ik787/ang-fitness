import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './containers/register/register.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule],
  exports: [],
  providers: [],
})
export class RegisterModule {}
