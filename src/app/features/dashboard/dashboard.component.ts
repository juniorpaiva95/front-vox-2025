import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CompanyRequestService } from '../../core/services/company-request.service';
import { CompanyRequest } from './models/company-request.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200">
            Sair
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-vox-blue-light">Solicitações de Empresas</h2>
            <div class="flex gap-4">
              <span class="text-sm text-vox-gray">
                Total: {{ companyRequestService.totalRequests() }}
              </span>
              <span class="text-sm text-vox-gray">
                Ativas: {{ companyRequestService.activeRequests() }}
              </span>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-vox-gray uppercase tracking-wider">
                  Empresa
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-vox-gray uppercase tracking-wider">
                  Responsável
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-vox-gray uppercase tracking-wider">
                  Endereço
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-vox-gray uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let request of companyRequestService.getCompanyRequests()()" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ request.empresa.ds_nome_fantasia }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ request.solicitante.ds_responsavel }}</div>
                  <div class="text-sm text-vox-gray">{{ request.solicitante.nu_cpf }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ request.empresa.endereco.ds_logradouro }}, {{ request.empresa.endereco.co_numero }}
                    <span *ngIf="request.empresa.endereco.ds_complemento">- {{ request.empresa.endereco.ds_complemento }}</span>
                  </div>
                  <div class="text-sm text-vox-gray">
                    {{ request.empresa.endereco.ds_bairro }} - {{ request.empresa.endereco.ds_municipio }}/{{ request.empresa.endereco.ds_uf }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Ativo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="companyRequestService.totalRequests() === 0" class="px-6 py-4 text-center text-vox-gray">
          Nenhuma solicitação encontrada
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    public companyRequestService: CompanyRequestService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  createNewRequest(): void {
    this.router.navigate(['/company-request/create']);
  }
}
