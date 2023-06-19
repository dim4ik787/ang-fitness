import { NgModule } from '@angular/core';
import { MealsComponent } from './containers/meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, MealsRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [],
  declarations: [MealsComponent],
})
export class MealsModule {}
