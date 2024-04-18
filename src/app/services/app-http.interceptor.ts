import { HttpInterceptorFn } from '@angular/common/http';
import { AppStateService } from './app-state.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  console.log('request is on its way');
  const appState: AppStateService = inject(AppStateService);
  const loadingService: LoadingService = inject(LoadingService);
  // appState.setProductState({
  //   status: 'LOADING',
  // });
  loadingService.showLoadingSpinner();
  let req = request.clone({
    headers: request.headers.set('Authorization', 'Bearer JWT'),
  });
  return next(req).pipe(
    finalize(() => {
      // appState.setProductState({
      //   status: 'LOADED',
      // });
      loadingService.hideLoadingSpinner();
    })
  );
};
