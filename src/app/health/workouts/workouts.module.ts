import { NgModule } from '@angular/core';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

@NgModule({
  imports: [CommonModule, WorkoutsRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [],
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent, WorkoutTypeComponent],
})
export class WorkoutsModule {}
