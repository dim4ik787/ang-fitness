import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';

export type SelectedSection = {
  type: string;
  assigned: Array<string>;
  data: ScheduleItem;
  triggeredElement: HTMLElement;
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

  @Output() selected = new EventEmitter<SelectedSection>();

  onSelect(event: Event, type: string, assigned: Array<string> = []): void {
    const data = this.section;
    const triggeredElement = event.target as HTMLElement;

    this.selected.emit({
      type,
      assigned,
      data,
      triggeredElement,
    });
  }
}
