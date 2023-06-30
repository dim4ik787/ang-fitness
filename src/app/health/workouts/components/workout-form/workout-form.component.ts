import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutFormComponent implements OnChanges {
  @ViewChildren('formRow') formRows: QueryList<ElementRef> | undefined;
  @Input() workout?: Workout;
  @Output() create = new EventEmitter<Workout>();
  @Output() update = new EventEmitter<Workout>();
  @Output() remove = new EventEmitter<Workout>();

  toggled = false;
  exists = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.formBuilder.group({
      reps: [0, Validators.min(0)],
      sets: [0, Validators.min(0)],
      weight: [0, Validators.min(0)],
    }),
    endurance: this.formBuilder.group({
      distance: [0, Validators.min(0)],
      duration: [0, Validators.min(0)],
    }),
  });

  get required(): boolean {
    return this.form.get('name')!.hasError('required') && this.form.get('name')!.touched;
  }

  get placeholder(): string {
    return `e.g. ${this.form.get('type')?.value === 'strength' ? 'Bench press' : 'Swim'}`;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    if (this.workout?.name) {
      this.exists = true;
      this.form.patchValue(this.workout);
    }
  }

  createWorkout(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value as Workout);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      const formWorkout = this.form.value as Workout;
      formWorkout.$key = this.workout!.$key;
      this.update.emit(formWorkout);
    }
  }

  removeWorkout() {
    this.remove.emit(this.workout);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
