import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnChanges {
  @ViewChildren('formRow') formRows: QueryList<ElementRef> | undefined;

  @Input()
  meal?: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  toggled = false;
  exists = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: this.formBuilder.array(['']),
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray<FormControl<string | null>>;
  }

  get required() {
    return this.form.get('name')!.hasError('required') && this.form.get('name')!.touched;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    if (this.meal?.name) {
      this.exists = true;
      this.emptyIngredients();

      this.form.patchValue(this.meal);

      if (this.meal.ingredients) {
        for (const item of this.meal.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
      this.setFocusOnInput();
    }
  }
  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value as Meal);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      const formMeal = this.form.value as Meal;
      formMeal.$key = this.meal!.$key;
      this.update.emit(formMeal);
    }
  }

  removeMeal() {
    this.remove.emit(this.meal);
  }

  addIngredient(): void {
    const elem = this.findEmptyFoodInput();
    if (!elem) {
      this.ingredients.push(new FormControl(''));
      this.setFocusOnInput();
    } else {
      this.setFocusOnInput(elem);
    }
  }

  removeIngredient(index: number): void {
    if (this.ingredients.controls.length > 1) {
      this.ingredients.removeAt(index);
      this.setFocusOnInput();
    } else {
      this.ingredients.controls[0].patchValue('');
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  private findEmptyFoodInput(): HTMLElement | null {
    if (this.formRows) {
      const formRowElements: ElementRef<HTMLElement>[] = this.formRows.toArray();
      const emptyInput = formRowElements.find(row => {
        const inputElement = row.nativeElement.querySelector('input');
        return inputElement && inputElement.value === '';
      });

      if (emptyInput) return emptyInput.nativeElement;

      return null;
    }

    return null;
  }

  private setFocusOnInput(elem?: HTMLElement): void {
    if (!elem) {
      setTimeout(() => {
        if (this.formRows) {
          const formRowElements: ElementRef<HTMLElement>[] = this.formRows.toArray();
          const lastInput: HTMLInputElement | null =
            formRowElements[formRowElements.length - 1].nativeElement.querySelector('input');

          if (lastInput) lastInput.focus();
        }
      });
    } else {
      elem.focus();
    }
  }
}
