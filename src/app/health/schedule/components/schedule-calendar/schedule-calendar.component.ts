import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  ScheduleItem,
  ScheduleList,
} from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCalendarComponent implements OnChanges {
  @Input()
  set date(date: Date | null) {
    if (date) this.selectedDay = new Date(date.getTime());
  }
  @Input() items: ScheduleList | null = null;

  @Output() dateChanged = new EventEmitter<Date>();
  @Output() selected = new EventEmitter<unknown>();

  selectedDay!: Date;
  selectedDayIndex!: number;
  selectedWeek!: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks & Drinks' },
  ];

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    return (this.items && (this.items[name] as ScheduleItem)) || ({} as ScheduleItem);
  }

  changeDate(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.dateChanged.emit(startDate);
  }

  changeDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);

    selectedDay.setDate(selectedDay.getDate() + index);

    this.dateChanged.emit(selectedDay);
  }

  selectSection(
    { type, assigned, data }: { type: string; assigned: string; data: Date },
    section: string
  ) {
    const day = this.selectedDay;

    this.selected.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;

    if (today < 0) today = 6;

    return today;
  }
}
