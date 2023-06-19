
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: WorkoutsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class WorkoutsRoutingModule {}
