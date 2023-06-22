import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MealsComponent,
  },
  {
    path: 'new',
    component: MealComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
