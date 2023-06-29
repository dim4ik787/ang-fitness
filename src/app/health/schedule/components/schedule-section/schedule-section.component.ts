import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

export type SelectedSection = {
  type: string;
  assigned: Array<Meal | Workout>;
  data: ScheduleItem;
};

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent {
  @Input() name!: string;
  @Input() section!: ScheduleItem;

  @Output() selected = new EventEmitter<any>();

  onSelect(type: string, assigned: Array<Meal | Workout> = []) {
    const data = this.section;

    this.selected.emit({
      type,
      assigned,
      data,
    });
  }
}
