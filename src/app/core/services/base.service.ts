import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseService {
  protected apiUrl: string;

  constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {
    this.apiUrl = `${environment.apiUrl}/${endpoint}`;
  }

  protected get<T>(path: string = '', params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params });
  }

  protected post<T>(path: string = '', body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  protected put<T>(path: string = '', body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body);
  }

  protected delete<T>(path: string = ''): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`);
  }
} 