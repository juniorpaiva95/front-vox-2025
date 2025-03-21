import { Injectable } from '@angular/core';
import { CompanyRequest } from '../../features/company-request/models/company-request.model';
import { StateService } from '../../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private stateService: StateService) {}

  getCompanyRequests(): CompanyRequest[] {
    return this.stateService.getState().empresas;
  }

  addCompanyRequest(request: CompanyRequest): void {
    const currentEmpresas = this.stateService.getState().empresas;
    this.stateService.set('empresas', [...currentEmpresas, request]);
  }

  updateCompanyRequest(id: string, request: CompanyRequest): void {
    const currentEmpresas = this.stateService.getState().empresas;
    const updatedEmpresas = currentEmpresas.map(e => 
      e.id === id ? request : e
    );
    this.stateService.set('empresas', updatedEmpresas);
  }

  deleteCompanyRequest(id: string): void {
    const currentEmpresas = this.stateService.getState().empresas;
    const filteredEmpresas = currentEmpresas.filter(e => e.id !== id);
    this.stateService.set('empresas', filteredEmpresas);
  }
} 