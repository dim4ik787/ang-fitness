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
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: any;
  @Input() list!: Array<Meal | Workout> | null;

  @Output() update = new EventEmitter<any>();
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
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string): void {
    if (this.exists(name)) this.selected = this.selected.filter(item => item !== name);
    else this.selected = [...this.selected, name];
    console.log(this.selected);
  }

  getRoute(name: string): string[] {
    return [`../${name}/new`];
  }

  exists(name: string): boolean {
    return !!~this.selected.indexOf(name);
  }

  updateAssign(): void {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign(): void {
    this.cancel.emit();
  }
}
