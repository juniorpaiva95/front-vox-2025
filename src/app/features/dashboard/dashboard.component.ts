import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CompanyRequestService } from '../../core/services/company-request.service';
import { CompanyRequest } from '../company-request/models/company-request.model';
import { MockDataService } from '../../core/services/mock-data.service';
import { BadgeComponent, BadgeVariant } from '../../core/components/badge/badge.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { companyRequests, totalRequests, activeRequests, pendingRequests, inactiveRequests } from '../company-request/state/company-request.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent, BadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showDeleteModal = false;
  requestToDelete: string | null = null;
  
  // Signals do state
  protected readonly requests = companyRequests;
  protected readonly total = totalRequests;
  protected readonly active = activeRequests;
  protected readonly pending = pendingRequests;
  protected readonly inactive = inactiveRequests;
  constructor(
    private authService: AuthService,
    private router: Router,
    public companyRequestService: CompanyRequestService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    // Carrega os dados iniciais
    this.mockDataService.getCompanyRequests();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'inactive':
        return 'Inativo';
      default:
        return 'Desconhecido';
    }
  }

  getStatusVariant(status: string): BadgeVariant {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'danger';
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

  viewRequest(id: string): void {
    this.router.navigate(['/company-request/view', id]);
  }

  editRequest(id: string): void {
    this.router.navigate(['/company-request/edit', id]);
  }

  deleteRequest(id: string): void {
    this.requestToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.requestToDelete) {
      this.mockDataService.deleteCompanyRequest(this.requestToDelete);
      this.showDeleteModal = false;
      this.requestToDelete = null;
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.requestToDelete = null;
  }
}
