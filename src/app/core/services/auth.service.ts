import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MOCK_USER = {
    email: 'admin',
    password: 'admin'
  };

  constructor() {}

  login(credentials: LoginCredentials): Observable<any> {
    return of({
      success: credentials.email === this.MOCK_USER.email && credentials.password === this.MOCK_USER.password,
      user: credentials.email === this.MOCK_USER.email ? { email: credentials.email } : null
    }).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
} 