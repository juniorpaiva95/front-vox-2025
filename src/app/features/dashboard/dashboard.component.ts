import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CompanyRequest } from '../company-request/models/company-request.model';
import { BadgeComponent, BadgeVariant } from '../../core/components/badge/badge.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { DocumentPipe } from '../../shared/pipes/document.pipe';  
import { CompanyStateService } from '../company-request/state/company-state.service';
import { CompanyRequestService } from '../company-request/services/company-request.service';
import { DropdownComponent, DropdownItem } from '../../core/components/dropdown/dropdown.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent, BadgeComponent, DocumentPipe, DropdownComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showDeleteModal = false;
  requestToDelete: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    public companyRequestService: CompanyRequestService,
    public companyStateService: CompanyStateService
  ) {}

  ngOnInit(): void {}

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
      this.companyRequestService.deleteCompanyRequest(this.requestToDelete).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.requestToDelete = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.requestToDelete = null;
  }

  getDropdownItems(request: CompanyRequest): DropdownItem[] {
    return [
      {
        label: 'Visualizar',
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
        color: 'text-vox-blue-light',
        action: () => this.viewRequest(request.id)
      },
      {
        label: 'Editar',
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        color: 'text-yellow-600',
        action: () => this.editRequest(request.id)
      },
      {
        label: 'Excluir',
        icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
        color: 'text-red-600',
        action: () => this.deleteRequest(request.id)
      }
    ];
  }
}
