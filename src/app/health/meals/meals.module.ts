import { NgModule } from '@angular/core';
import { MealsComponent } from './containers/meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

@NgModule({
  imports: [CommonModule, MealsRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [],
  declarations: [MealsComponent, MealComponent, MealFormComponent],
})
export class MealsModule {}
