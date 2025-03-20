import { Injectable, signal } from '@angular/core';
import { CompanyRequest } from '../../features/company-request/models/company-request.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly mockData = signal<CompanyRequest[]>([
    {
      "id": "1",
      "solicitante": {
        "ds_responsavel": "João Silva",
        "nu_cpf": "123.456.789-00",
        "date_nascimento": "1990-01-01"
      },
      "empresa": {
        "ds_nome_fantasia": "Tech Solutions",
        "endereco": {
          "co_cep": "12345678",
          "ds_logradouro": "Rua das Flores",
          "co_numero": "123",
          "ds_complemento": "Sala 45",
          "ds_bairro": "Centro",
          "ds_municipio": "São Paulo",
          "ds_uf": "SP"
        }
      }
    },
    {
      "id": "2",
      "solicitante": {
        "ds_responsavel": "Maria Santos",
        "nu_cpf": "987.654.321-00",
        "date_nascimento": "1985-05-15"
      },
      "empresa": {
        "ds_nome_fantasia": "Digital Innovations",
        "endereco": {
          "co_cep": "87654321",
          "ds_logradouro": "Avenida Principal",
          "co_numero": "456",
          "ds_complemento": undefined,
          "ds_bairro": "Jardim América",
          "ds_municipio": "Rio de Janeiro",
          "ds_uf": "RJ"
        }
      }
    }
  ]);

  constructor() {}

  getCompanyRequests() {
    return this.mockData.asReadonly();
  }

  addCompanyRequest(request: CompanyRequest) {
    this.mockData.update(requests => [...requests, request]);
  }

  updateCompanyRequest(id: string, request: CompanyRequest) {
    this.mockData.update(requests => 
      requests.map(req => req.id === id ? request : req)
    );
  }

  deleteCompanyRequest(id: string) {
    this.mockData.update(requests => 
      requests.filter(req => req.id !== id)
    );
  }
} 