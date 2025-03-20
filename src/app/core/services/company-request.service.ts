import { Injectable, computed } from '@angular/core';
import { CompanyRequest } from '../../features/company-request/models/company-request.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {
  private companyRequests;
  readonly totalRequests;
  readonly activeRequests;

  constructor(private mockDataService: MockDataService) {
    this.companyRequests = this.mockDataService.getCompanyRequests();
    this.totalRequests = computed(() => this.companyRequests().length);
    this.activeRequests = computed(() => this.companyRequests().filter(req => req.empresa.ds_nome_fantasia.includes('Tech')).length);
  }

  getCompanyRequests() {
    return this.companyRequests;
  }

  addCompanyRequest(request: CompanyRequest) {
    this.mockDataService.addCompanyRequest(request);
  }

  updateCompanyRequest(id: string, request: CompanyRequest) {
    this.mockDataService.updateCompanyRequest(id, request);
  }

  deleteCompanyRequest(id: string) {
    this.mockDataService.deleteCompanyRequest(id);
  }
} 