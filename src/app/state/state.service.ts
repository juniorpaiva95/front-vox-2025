import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CompanyRequest } from '../features/company-request/models/company-request.model';
import mockData from '../../mocks/db.json';

export interface AppState {
  loading: boolean;
  error: string | null;
  user: any | null;
  empresas: CompanyRequest[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  user: null,
  empresas: []
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);

  constructor() {
    const empresas = mockData.empresas.map(empresa => ({
      ...empresa,
      status: empresa.status as 'active' | 'inactive' | 'pending'
    }));
    this.set('empresas', empresas);
  }

  select<K extends keyof AppState>(key: K): Observable<AppState[K]> {
    return this.state.pipe(
      map(state => state[key]),
      distinctUntilChanged()
    );
  }

  set<K extends keyof AppState>(key: K, value: AppState[K]): void {
    this.state.next({
      ...this.state.value,
      [key]: value
    });
  }

  reset(): void {
    this.state.next(initialState);
  }

  getState(): AppState {
    return this.state.value;
  }
} 