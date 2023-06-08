import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MealsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class MealsRoutingModule {}
