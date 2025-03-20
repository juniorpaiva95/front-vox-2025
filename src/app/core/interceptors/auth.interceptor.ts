import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  if (authService.isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${user.email}`)
    });
    return next(authReq);
  }
  
  return next(req);
}; 