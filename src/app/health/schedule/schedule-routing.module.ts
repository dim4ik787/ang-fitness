
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class ScheduleRoutingModule {}
