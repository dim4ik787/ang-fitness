import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {
  @Input() selected!: number;
  @Output() selectedDay = new EventEmitter<number>();
  @ViewChild('displayButtons') viewButtonsControl!: ElementRef<HTMLInputElement>;

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  selectDay(i: number): void {
    this.selectedDay.emit(i);
    const elem = this.viewButtonsControl.nativeElement;
    elem.checked = !elem.checked;
  }
}
