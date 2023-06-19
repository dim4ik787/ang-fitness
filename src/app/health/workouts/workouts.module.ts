import { NgModule } from '@angular/core';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, WorkoutsRoutingModule],
  exports: [],
  declarations: [WorkoutsComponent],
})
export class WorkoutsModule {}
