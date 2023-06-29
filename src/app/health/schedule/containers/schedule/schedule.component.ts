import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import {
  ScheduleList,
  ScheduleService,
} from 'src/app/health/shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$!: Observable<Date>;
  selected$!: Observable<any>;
  schedule$!: Observable<ScheduleList>;
  subscriptions!: Subscription[];
  list$!: Observable<Array<Meal | Workout>>;

  open = false;

  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select<Date>('date');
    this.selected$ = this.store.select<any>('selected');
    this.schedule$ = this.store.select<ScheduleList>('schedule');
    this.list$ = this.store.select<Array<Meal | Workout>>('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(data: any) {
    this.open = true;
    this.scheduleService.selectSection(data);
  }

  closeAssign() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
