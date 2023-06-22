import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  constructor(private mealsService: MealsService, private router: Router) {}

  addMeal(meal: Meal) {
    this.mealsService
      .addMeal(meal)
      .pipe(take(1))
      .subscribe(() => this.backToMeals());
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }
}
