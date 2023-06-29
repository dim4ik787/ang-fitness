import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(module => module.ScheduleModule),
    canActivate: [authGuard],
  },
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module').then(module => module.MealsModule),
    canActivate: [authGuard],
  },
  {
    path: 'workouts',
    loadChildren: () => import('./workouts/workouts.module').then(module => module.WorkoutsModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class HealthRoutingModule {}
