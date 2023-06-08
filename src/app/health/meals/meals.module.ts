import { NgModule } from '@angular/core';
import { MealsComponent } from './containers/meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HealthRoutingModule } from '../health-routing.module';

@NgModule({
  imports: [CommonModule, HealthRoutingModule, ReactiveFormsModule],
  exports: [],
  declarations: [MealsComponent],

})
export class MealsModule { }
