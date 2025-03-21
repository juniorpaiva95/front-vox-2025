import { Injectable } from '@angular/core';
import { StateService } from '../../../state/state.service';
import { CompanyRequest } from '../models/company-request.model';
import { signal } from '@angular/core';
import mockData from '../../../../mocks/db.json';


interface CompanyState {
  requests: CompanyRequest[];
  totalRequests: number;
  activeRequests: number;
  pendingRequests: number;
  inactiveRequests: number;
}

const initialState: CompanyState = {
  requests: [],
  totalRequests: 0,
  activeRequests: 0,
  pendingRequests: 0,
  inactiveRequests: 0
};

@Injectable({
  providedIn: 'root'
})
export class CompanyStateService extends StateService {
  companyState = signal<CompanyState>(initialState);

  constructor() {
    super();
    this.initializeWithMockData();
  }

  get requests() {
    return this.companyState().requests;
  }

  get totalRequests() {
    return this.companyState().totalRequests;
  }

  get activeRequests() {
    return this.companyState().activeRequests;
  }

  get pendingRequests() {
    return this.companyState().pendingRequests;
  }

  get inactiveRequests() {
    return this.companyState().inactiveRequests;
  }

  addCompanyRequest(request: CompanyRequest): void {
    this.companyState.update(current => {
      const newRequests = [...current.requests, request];
      return {
        ...current,
        requests: newRequests,
        totalRequests: newRequests.length,
        activeRequests: newRequests.filter(r => r.status === 'active').length,
        pendingRequests: newRequests.filter(r => r.status === 'pending').length,
        inactiveRequests: newRequests.filter(r => r.status === 'inactive').length
      };
    });
  }

  updateCompanyRequest(id: string, request: CompanyRequest): void {
    this.companyState.update(current => {
      const newRequests = current.requests.map(r => 
        r.id === id ? request : r
      );
      return {
        ...current,
        requests: newRequests,
        totalRequests: newRequests.length,
        activeRequests: newRequests.filter(r => r.status === 'active').length,
        pendingRequests: newRequests.filter(r => r.status === 'pending').length
      };
    });
  }

  deleteCompanyRequest(id: string): void {
    console.log(`Deleting request with id: ${id}`);
    this.companyState.update(current => {
      const newRequests = current.requests.filter(r => r.id !== id);
      return {
        ...current,
        requests: newRequests,
        totalRequests: newRequests.length,
        activeRequests: newRequests.filter(r => r.status === 'active').length,
        pendingRequests: newRequests.filter(r => r.status === 'pending').length,
        inactiveRequests: newRequests.filter(r => r.status === 'inactive').length
      };
    });
  }

  initializeWithMockData(): void {

    const empresas = mockData.empresas.map(empresa => ({
        ...empresa,
        status: empresa.status as 'active' | 'inactive' | 'pending'
      }));
    

    this.companyState.set({
      requests: empresas,
      totalRequests: empresas.length,
      activeRequests: empresas.filter(r => r.status === 'active').length,
      pendingRequests: empresas.filter(r => r.status === 'pending').length,
      inactiveRequests: empresas.filter(r => r.status === 'inactive').length
    });
  }
} 