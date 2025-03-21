import { Injectable } from '@angular/core';
import { CompanyRequest } from '../models/company-request.model';
import { CompanyStateService } from '../state/company-state.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {
  constructor(private companyStateService: CompanyStateService) {}

  getCompanyRequests(): Observable<CompanyRequest[]> {
    return of(this.companyStateService.requests);
  }

  addCompanyRequest(request: CompanyRequest): Observable<CompanyRequest> {
    this.companyStateService.addCompanyRequest(request);
    return of(request);
  }

  updateCompanyRequest(id: string, request: CompanyRequest): Observable<CompanyRequest> {
    this.companyStateService.updateCompanyRequest(id, request);
    return of(request);
  }

  deleteCompanyRequest(id: string): Observable<void> {
    console.log(`Deleting request with id: ${id}`);
    this.companyStateService.deleteCompanyRequest(id);
    return of(void 0);
  }
} 