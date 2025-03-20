import { Injectable, computed, signal } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { companyRequests, addCompanyRequest, updateCompanyRequest, deleteCompanyRequest } from '../../features/company-request/state/company-request.state';

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {
  readonly totalRequests = computed(() => companyRequests().length);
  readonly activeRequests = computed(() => companyRequests().filter(request => request.status === 'active').length);
  readonly pendingRequests = computed(() => companyRequests().filter(request => request.status === 'pending').length);

  constructor(private mockDataService: MockDataService) {
    // Inicializa o estado com os dados do mock
    const initialRequests = this.mockDataService.getCompanyRequests();
    initialRequests.forEach(request => addCompanyRequest(request));
  }

  getCompanyRequests() {
    return companyRequests();
  }

  getCompanyRequest(id: string) {
    return companyRequests().find(request => request.id === id);
  }

  addCompanyRequest(request: any) {
    addCompanyRequest(request);
  }

  updateCompanyRequest(id: string, request: any) {
    updateCompanyRequest(id, request);
  }

  deleteCompanyRequest(id: string) {
    deleteCompanyRequest(id);
  }
} 