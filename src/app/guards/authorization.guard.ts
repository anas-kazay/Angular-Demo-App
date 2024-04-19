import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const appState: AppStateService = inject(AppStateService);
  const router: Router = inject(Router);

  if (appState.authState.roles.includes(route.data['requiredRoles'])) {
    return true;
  } else {
    router.navigateByUrl('/admin/notAuthorized');
    return false;
  }
};
