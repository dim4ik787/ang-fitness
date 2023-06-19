import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/internal/operators/map';

import { AuthService } from '../services/auth/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState.pipe(
    map(user => {
      if (!user) router.navigate(['/auth/login']);

      return !!user;
    })
  );
};
