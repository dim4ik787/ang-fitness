import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleControlsComponent {
  @Input()
  selected!: Date;

  @Output() moveDate = new EventEmitter<number>();

  offset = 0;

  onMoveDate(offset: number): void {
    this.offset = offset;
    this.moveDate.emit(offset);
  }
}
