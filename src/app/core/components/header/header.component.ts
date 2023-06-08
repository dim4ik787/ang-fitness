import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input()
  user!: User | null;

  @Output()
  logout = new EventEmitter<any>();

  onClick(): void {
    this.logoutUser();
  }

  onKeydown() {
    this.logoutUser();
  }

  private logoutUser() {
    this.logout.emit();
  }
}
