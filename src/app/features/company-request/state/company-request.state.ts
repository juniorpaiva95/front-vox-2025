import { signal } from '@angular/core';
import { CompanyRequest } from '../models/company-request.model';

export interface CompanyRequestState {
  requests: CompanyRequest[];
  totalRequests: number;
  activeRequests: number;
  pendingRequests: number;
}

const initialState: CompanyRequestState = {
  requests: [],
  totalRequests: 0,
  activeRequests: 0,
  pendingRequests: 0
};

export const companyRequestState = signal<CompanyRequestState>(initialState);

export const companyRequests = signal<CompanyRequest[]>([]);
export const totalRequests = signal<number>(0);
export const activeRequests = signal<number>(0);
export const pendingRequests = signal<number>(0);

export function updateCompanyRequests(requests: CompanyRequest[]) {
  companyRequests.set(requests);
  totalRequests.set(requests.length);
  activeRequests.set(requests.filter(request => request.status === 'active').length);
  pendingRequests.set(requests.filter(request => request.status === 'pending').length);
  
  companyRequestState.set({
    requests,
    totalRequests: requests.length,
    activeRequests: requests.filter(request => request.status === 'active').length,
    pendingRequests: requests.filter(request => request.status === 'pending').length
  });
}

export function addCompanyRequest(request: CompanyRequest) {
  const currentRequests = companyRequests();
  const newRequests = [...currentRequests, request];
  updateCompanyRequests(newRequests);
}

export function deleteCompanyRequest(id: string) {
  const currentRequests = companyRequests();
  const newRequests = currentRequests.filter(request => request.id !== id);
  updateCompanyRequests(newRequests);
}

export function updateCompanyRequest(id: string, updatedRequest: CompanyRequest) {
  const currentRequests = companyRequests();
  const newRequests = currentRequests.map(request => 
    request.id === id ? updatedRequest : request
  );
  updateCompanyRequests(newRequests);
} 