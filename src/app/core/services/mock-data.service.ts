import { Injectable } from '@angular/core';
import { CompanyRequest } from '../../features/company-request/models/company-request.model';
import { updateCompanyRequests } from '../../features/company-request/state/company-request.state';
import mockData from '../../../mocks/db.json';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockData: CompanyRequest[] = mockData.empresas;

  getCompanyRequests(): CompanyRequest[] {
    return this.mockData;
  }

  addCompanyRequest(request: CompanyRequest): void {
    this.mockData.push(request);
    updateCompanyRequests(this.mockData);
  }

  updateCompanyRequest(id: string, request: CompanyRequest): void {
    const index = this.mockData.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockData[index] = request;
      updateCompanyRequests(this.mockData);
    }
  }

  deleteCompanyRequest(id: string): void {
    this.mockData = this.mockData.filter(r => r.id !== id);
    updateCompanyRequests(this.mockData);
  }
} 