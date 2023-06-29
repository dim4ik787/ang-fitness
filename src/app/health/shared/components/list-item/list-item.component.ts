import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout } from '../../services/workouts/workouts.service';
import { Meal } from '../../services/meals/meals.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent<T extends Meal | Workout> {
  toggled = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() item!: any;
  @Output() remove = new EventEmitter<T>();

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  isMeal(item: T): boolean {
    return (item as Meal).ingredients !== undefined;
  }

  getRoute(item: T) {
    return [`../${'ingredients' in item ? 'meals' : 'workouts'}/`, item.$key];
  }
}
