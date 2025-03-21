import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { BadgeComponent, BadgeVariant } from '../../../core/components/badge/badge.component';
import { DocumentPipe } from '../../../shared/pipes/document.pipe';
import { CompanyRequestService } from '../services/company-request.service';
import { CompanyStateService } from '../state/company-state.service';
@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [CommonModule, ModalComponent, BadgeComponent, DocumentPipe],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewRequestComponent implements OnInit {
  showDeleteModal = false;
  request: any = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private companyRequestService: CompanyRequestService,
    private companyStateService: CompanyStateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.request = this.companyStateService.requests.find(r => r.id === id);
      if (!this.request) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  deleteRequest(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.request) {
      this.companyRequestService.deleteCompanyRequest(this.request.id);
    }
    this.router.navigate(['/dashboard']);
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
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
      default:
        return 'info';
    }
  }
} 