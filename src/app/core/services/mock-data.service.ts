import { Injectable } from '@angular/core';
import { CompanyRequest } from '../../features/company-request/models/company-request.model';
import { updateCompanyRequests } from '../../features/company-request/state/company-request.state';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockData: CompanyRequest[] = [
    {
      id: '1',
      solicitante: {
        ds_responsavel: 'João Silva',
        nu_cpf: '123.456.789-00',
        date_nascimento: '1990-01-01'
      },
      empresa: {
        ds_nome_fantasia: 'Empresa A',
        endereco: {
          co_cep: '58037-545',
          ds_logradouro: 'Rua Exemplo',
          co_numero: '123',
          ds_complemento: 'Sala 1',
          ds_bairro: 'Centro',
          ds_municipio: 'João Pessoa',
          ds_uf: 'PB'
        }
      },
      status: 'active'
    },
    {
      id: '2',
      solicitante: {
        ds_responsavel: 'Maria Santos',
        nu_cpf: '987.654.321-00',
        date_nascimento: '1985-05-15'
      },
      empresa: {
        ds_nome_fantasia: 'Empresa B',
        endereco: {
          co_cep: '58037-546',
          ds_logradouro: 'Avenida Principal',
          co_numero: '456',
          ds_complemento: undefined,
          ds_bairro: 'Jardim América',
          ds_municipio: 'João Pessoa',
          ds_uf: 'PB'
        }
      },
      status: 'pending'
    }
  ];

  constructor() {
    // Inicializa o state com os dados mockados
    updateCompanyRequests(this.mockData);
  }

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