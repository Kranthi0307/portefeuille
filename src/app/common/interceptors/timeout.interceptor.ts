import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError, timeout } from "rxjs";

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('render.com')) {
    return next(req).pipe(
      timeout(8000),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          console.error('Request took too long');
        }
        return throwError(() => err);
      })
    );
  }
  return next(req).pipe(
    timeout(5000),
    catchError(err => {
      if (err.name === 'TimeoutError') {
        console.error('Request took too long');
      }
      return throwError(() => err);
    })
  );
};
