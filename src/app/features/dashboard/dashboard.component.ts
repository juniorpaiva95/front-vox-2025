import { Component, OnInit, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CompanyRequestService } from '../../core/services/company-request.service';
import { CompanyRequest } from '../company-request/models/company-request.model';
import { BadgeComponent } from '../../core/components/badge/badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-vox-blue-light">Dashboard</h1>
        <div class="flex gap-4">
          <button (click)="createNewRequest()" 
            class="px-4 py-2 bg-vox-blue-light text-white rounded-md hover:bg-vox-blue transition-colors duration-200">
            Nova Solicitação
          </button>
          <button (click)="logout()" 
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
            Sair
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Total de Solicitações</h3>
          <p class="text-3xl font-bold text-vox-blue-light">{{ totalRequests() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Solicitações Ativas</h3>
          <p class="text-3xl font-bold text-green-600">{{ activeRequests() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Solicitações Pendentes</h3>
          <p class="text-3xl font-bold text-yellow-600">{{ pendingRequests() }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let request of companyRequests()" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ request.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ request.solicitante.ds_responsavel }}</div>
                  <div class="text-sm text-vox-gray">{{ request.solicitante.nu_cpf }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ request.empresa.ds_nome_fantasia }}</div>
                  <div class="text-sm text-vox-gray">
                    {{ request.empresa.endereco.ds_logradouro }}, {{ request.empresa.endereco.co_numero }}
                    <span *ngIf="request.empresa.endereco.ds_complemento">- {{ request.empresa.endereco.ds_complemento }}</span>
                  </div>
                  <div class="text-sm text-vox-gray">
                    {{ request.empresa.endereco.ds_bairro }} - {{ request.empresa.endereco.ds_municipio }}/{{ request.empresa.endereco.ds_uf }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <app-badge 
                    [text]="getStatusText(request.status)"
                    [variant]="getStatusVariant(request.status)">
                  </app-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button (click)="viewRequest(request.id)" class="text-vox-blue-light hover:text-vox-blue mr-3">
                    Visualizar
                  </button>
                  <button (click)="editRequest(request.id)" class="text-yellow-600 hover:text-yellow-800 mr-3">
                    Editar
                  </button>
                  <button (click)="deleteRequest(request.id)" class="text-red-600 hover:text-red-800">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="companyRequests().length === 0" class="px-6 py-4 text-center text-vox-gray">
          Nenhuma solicitação encontrada
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  companyRequests: Signal<CompanyRequest[]> = computed(() => []);
  totalRequests: Signal<number> = computed(() => 0);
  activeRequests: Signal<number> = computed(() => 0);
  pendingRequests: Signal<number> = computed(() => 0);

  constructor(
    private authService: AuthService,
    private router: Router,
    public companyRequestService: CompanyRequestService
  ) {}

  ngOnInit(): void {
    this.companyRequests = this.companyRequestService.getCompanyRequests();
    this.totalRequests = computed(() => this.companyRequests().length);
    this.activeRequests = computed(() => this.companyRequests().filter((request: CompanyRequest) => request.status === 'active').length);
    this.pendingRequests = computed(() => this.companyRequests().filter((request: CompanyRequest) => request.status === 'pending').length);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  }

  getStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'info' {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'info';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  createNewRequest(): void {
    this.router.navigate(['/company-request/create']);
  }

  viewRequest(id: string) {
    // Implementar visualização
  }

  editRequest(id: string) {
    // Implementar edição
  }

  deleteRequest(id: string) {
    // Implementar exclusão
  }
}
