import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;

    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (error: unknown) {
      this.errorMessage = (error as Error).message;
      this.changeDetectorRef.markForCheck();
    }
  }
}
