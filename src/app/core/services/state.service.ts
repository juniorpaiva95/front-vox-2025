import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface AppState {
  loading: boolean;
  error: string | null;
  user: any | null;
}

const initialState: AppState = {
  loading: false,
  error: null,
  user: null
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);

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