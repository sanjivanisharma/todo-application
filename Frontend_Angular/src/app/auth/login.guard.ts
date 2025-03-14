import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService)
  const router = inject(Router)

  if (service.isLoggedIn()) {
    router.navigateByUrl('/todo')
    return false;
  }
  return true
};
