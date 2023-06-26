import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/internal/operators/take';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$!: Observable<Workout[]>;
  subscription!: Subscription;

  constructor(private workoutsService: WorkoutsService, private store: Store) {}

  ngOnInit(): void {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  removeWorkout(workout: Workout) {
    this.subscription.add(this.workoutsService.removeWorkout(workout.$key).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
