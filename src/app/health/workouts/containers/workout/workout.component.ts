import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, filter, switchMap, take } from 'rxjs';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$!: Observable<Workout>;
  subscription!: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.activatedRoute.params.pipe(
      filter((params: Params) => !!params),
      switchMap((params: Params) => {
        return this.workoutsService.getWorkout(params['id']);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addWorkout(workout: Workout) {
    this.workoutsService
      .addWorkout(workout)
      .pipe(take(1))
      .subscribe(() => this.backToWorkouts());
  }

  updateWorkout(workout: Workout) {
    this.workoutsService
      .updateWorkout(workout)
      .pipe(take(1))
      .subscribe(() => this.backToWorkouts());
  }

  removeWorkout(workout: Workout) {
    this.workoutsService
      .removeWorkout(workout.$key)
      .pipe(take(1))
      .subscribe(() => this.backToWorkouts());
  }

  private backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
