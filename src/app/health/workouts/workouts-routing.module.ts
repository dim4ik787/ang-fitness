import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
  {
    path: 'new',
    component: WorkoutComponent,
  },
  {
    path: ':id',
    component: WorkoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
