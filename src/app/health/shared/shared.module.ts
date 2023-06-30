import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

import { ListItemComponent } from './components/list-item/list-item.component';
import { RouterModule } from '@angular/router';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';
import { ScheduleService } from './services/schedule/schedule.service';
import { TrapFocusDirective } from './directives/trap-focus.directive';
import { MinimumValueDirective } from './directives/minimum-value.directive';

@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe,
    TrapFocusDirective,
    MinimumValueDirective,
  ],
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe, TrapFocusDirective, MinimumValueDirective],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService, ScheduleService],
    };
  }
}
