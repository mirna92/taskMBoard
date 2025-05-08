import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);
  const cloned = req.clone({
    setHeaders: {
      'x-api-key': 'x-key',
    },
  });

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 404) toaster.error(error.message);
      console.error('HTTP Error:', error.message);
      return throwError(() => new Error('Failed to connect to the server.'));
    })
  );
};
