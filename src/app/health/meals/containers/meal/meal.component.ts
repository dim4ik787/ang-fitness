import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, filter, switchMap, take } from 'rxjs';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  meal$!: Observable<Meal>;
  subscription!: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.activatedRoute.params.pipe(
      filter((params: Params) => !!params),
      switchMap((params: Params) => {
        return this.mealsService.getMeal(params['id']);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addMeal(meal: Meal) {
    this.mealsService
      .addMeal(meal)
      .pipe(take(1))
      .subscribe(() => this.backToMeals());
  }

  updateMeal(meal: Meal) {
    this.mealsService
      .updateMeal(meal)
      .pipe(take(1))
      .subscribe(() => this.backToMeals());
  }

  removeMeal(meal: Meal) {
    this.mealsService
      .removeMeal(meal.$key)
      .pipe(take(1))
      .subscribe(() => this.backToMeals());
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }
}
