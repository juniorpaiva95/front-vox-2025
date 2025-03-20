import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-vox-blue-light">Dashboard</h1>
        <button (click)="logout()" 
          class="px-4 py-2 bg-vox-blue-light text-white rounded-md hover:bg-vox-blue transition-colors duration-200">
          Sair
        </button>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-gray-600">Bem-vindo ao sistema Vox!</p>
      </div>
    </div>
  `
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
