import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError, timeout } from "rxjs";

/**
 * Allowing a request to render.com for 90 seconds
 */
export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {

  const timeout_value = req.url.includes('render.com') ? 90000 : 5000;

  return next(req).pipe(
    timeout(timeout_value),
    catchError(err => {
      if (err.name === 'TimeoutError') {
        console.error('Request took too long');
      }
      return throwError(() => err);
    })
  );
};
