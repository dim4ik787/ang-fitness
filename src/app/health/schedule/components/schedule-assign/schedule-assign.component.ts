import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { ISelectedData } from 'src/app/health/shared/services/schedule/schedule.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section!: ISelectedData | null;
  @Input() list!: Array<Meal | Workout> | null;

  @Output() update = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @HostListener('click', ['$event']) onClick(event: Event) {
    if (event.target === event.currentTarget) this.cancelAssign();
  }

  @HostListener('keydown', ['$event']) onEsc(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    this.cancelAssign();
    event.preventDefault();
  }

  private selected: string[] = [];

  ngOnInit(): void {
    if (this.section) this.selected = [...this.section.assigned];
    document.body.style.overflow = 'hidden';
  }

  toggleItem(name: string): void {
    if (this.exists(name)) this.selected = this.selected.filter(item => item !== name);
    else this.selected = [...this.selected, name];
  }

  getRoute(name: string): string[] {
    return [`../${name}/new`];
  }

  exists(name: string): boolean {
    return !!~this.selected.indexOf(name);
  }

  updateAssign(): void {
    if (this.section) {
      this.section.triggeredElement.focus();
      document.body.style.overflow = '';

      this.update.emit({
        [this.section.type]: this.selected,
      });
    }
  }

  cancelAssign(): void {
    this.section?.triggeredElement.focus();
    document.body.style.overflow = '';
    this.cancel.emit();
  }
}
