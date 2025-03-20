import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="mt-6">
          <h2 class="mt-6 text-center text-3xl font-bold text-vox-blue-light">
            Bem-vindo ao Vox 2025
          </h2>
          <p class="mt-2 text-center text-sm text-vox-gray">
            Faça login para acessar sua conta
          </p>
        </div>
        <form class="mt-8 space-y-6" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Usuário</label>
              <input id="username" name="username" type="text" formControlName="username" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-vox-blue focus:border-vox-blue focus:z-10 sm:text-sm"
                placeholder="Usuário">
              <div *ngIf="isFieldInvalid('username')" class="text-red-500 text-xs mt-1">
                {{ getFieldError('username') }}
              </div>
            </div>
            <div>
              <label for="password" class="sr-only">Senha</label>
              <input id="password" name="password" type="password" formControlName="password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-vox-blue focus:border-vox-blue focus:z-10 sm:text-sm"
                placeholder="Senha">
              <div *ngIf="isFieldInvalid('password')" class="text-red-500 text-xs mt-1">
                {{ getFieldError('password') }}
              </div>
            </div>
          </div>

          <div *ngIf="error" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
            {{ error }}
          </div>

          <div>
            <button type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-vox-blue-light hover:bg-vox-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vox-blue-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório';
      }
    }
    return '';
  }

  onSubmit() {
    this.error = '';

    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });

    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.authService.login({
        email: this.loginForm.value.username,
        password: this.loginForm.value.password
      }).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Usuário ou senha incorretos';
          }
        },
        error: () => {
          this.isLoading = false;
          this.error = 'Erro ao fazer login. Por favor, tente novamente.';
        }
      });
    } else {
      const firstInvalidField = Object.keys(this.loginForm.controls).find(key => 
        this.loginForm.get(key)?.invalid
      );
      
      if (firstInvalidField) {
        this.error = this.getFieldError(firstInvalidField);
      }
    }
  }
} 