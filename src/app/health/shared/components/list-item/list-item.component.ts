import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent<T extends { $key: string; name: string; ingredients?: string[] }> {
  toggled = false;

  @Input() item!: T;
  @Output() remove = new EventEmitter<T>();

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: T) {
    return [`../meals`, item.$key];
  }
}
