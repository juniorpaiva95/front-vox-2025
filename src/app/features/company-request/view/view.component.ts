import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { companyRequests } from '../state/company-request.state';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { BadgeComponent, BadgeVariant } from '../../../core/components/badge/badge.component';

@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [CommonModule, ModalComponent, BadgeComponent],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewRequestComponent implements OnInit {
  showDeleteModal = false;
  request: any = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.request = companyRequests().find(r => r.id === id);
      if (!this.request) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  deleteRequest(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    // Implementar exclusão
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