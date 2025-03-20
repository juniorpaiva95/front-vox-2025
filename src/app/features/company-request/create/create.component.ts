import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompanyRequestService } from '../../../core/services/company-request.service';
import { CepService } from '../../../core/services/cep.service';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-vox-blue-light">Nova Solicitação</h1>
        <button (click)="goBack()" 
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200">
          Voltar
        </button>
      </div>

      <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow p-6">
        <div class="space-y-6">
          <!-- Dados do Solicitante -->
          <div formGroupName="solicitante">
            <h2 class="text-lg font-semibold text-vox-blue-light mb-4">Dados do Solicitante</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="ds_responsavel" class="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" id="ds_responsavel" formControlName="ds_responsavel"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <div *ngIf="isFieldInvalid('solicitante.ds_responsavel')" class="text-red-500 text-xs mt-1">
                  {{ getFieldError('solicitante.ds_responsavel') }}
                </div>
              </div>

              <div>
                <label for="nu_cpf" class="block text-sm font-medium text-gray-700">CPF</label>
                <input type="text" id="nu_cpf" formControlName="nu_cpf"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <div *ngIf="isFieldInvalid('solicitante.nu_cpf')" class="text-red-500 text-xs mt-1">
                  {{ getFieldError('solicitante.nu_cpf') }}
                </div>
              </div>

              <div>
                <label for="date_nascimento" class="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                <input type="date" id="date_nascimento" formControlName="date_nascimento"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <div *ngIf="isFieldInvalid('solicitante.date_nascimento')" class="text-red-500 text-xs mt-1">
                  {{ getFieldError('solicitante.date_nascimento') }}
                </div>
              </div>
            </div>
          </div>

          <!-- Dados da Empresa -->
          <div formGroupName="empresa">
            <h2 class="text-lg font-semibold text-vox-blue-light mb-4">Dados da Empresa</h2>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="ds_nome_fantasia" class="block text-sm font-medium text-gray-700">Nome Fantasia</label>
                <input type="text" id="ds_nome_fantasia" formControlName="ds_nome_fantasia"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <div *ngIf="isFieldInvalid('empresa.ds_nome_fantasia')" class="text-red-500 text-xs mt-1">
                  {{ getFieldError('empresa.ds_nome_fantasia') }}
                </div>
              </div>

              <div formGroupName="endereco" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-4">
                  <label for="co_cep" class="block text-sm font-medium text-gray-700">CEP</label>
                  <div class="flex gap-2">
                    <input type="text" id="co_cep" formControlName="co_cep"
                      (blur)="consultarCep()"
                      class="mt-1 block w-64 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      invalid:border-pink-500 invalid:text-pink-600
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                    <button type="button" 
                      [disabled]="isLoadingCep || !requestForm.get('empresa.endereco.co_cep')?.value?.length || requestForm.get('empresa.endereco.co_cep')?.invalid"
                      (click)="consultarCep()"
                      class="mt-1 px-4 py-2 bg-vox-blue-light text-white rounded-md hover:bg-vox-blue transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                      <svg *ngIf="isLoadingCep" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ isLoadingCep ? 'Buscando...' : 'Buscar' }}
                    </button>
                  </div>
                  <div *ngIf="isFieldInvalid('empresa.endereco.co_cep')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.co_cep') }}
                  </div>
                  <div *ngIf="cepError" class="text-red-500 text-xs mt-1">
                    {{ cepError }}
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label for="ds_logradouro" class="block text-sm font-medium text-gray-700">Logradouro</label>
                  <input type="text" id="ds_logradouro" formControlName="ds_logradouro"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.ds_logradouro')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.ds_logradouro') }}
                  </div>
                </div>

                <div>
                  <label for="co_numero" class="block text-sm font-medium text-gray-700">Número</label>
                  <input type="text" id="co_numero" formControlName="co_numero"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.co_numero')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.co_numero') }}
                  </div>
                </div>

                <div>
                  <label for="ds_complemento" class="block text-sm font-medium text-gray-700">Complemento</label>
                  <input type="text" id="ds_complemento" formControlName="ds_complemento"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.ds_complemento')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.ds_complemento') }}
                  </div>
                </div>

                <div>
                  <label for="ds_bairro" class="block text-sm font-medium text-gray-700">Bairro</label>
                  <input type="text" id="ds_bairro" formControlName="ds_bairro"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.ds_bairro')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.ds_bairro') }}
                  </div>
                </div>

                <div>
                  <label for="ds_municipio" class="block text-sm font-medium text-gray-700">Município</label>
                  <input type="text" id="ds_municipio" formControlName="ds_municipio"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.ds_municipio')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.ds_municipio') }}
                  </div>
                </div>

                <div>
                  <label for="ds_uf" class="block text-sm font-medium text-gray-700">UF</label>
                  <input type="text" id="ds_uf" formControlName="ds_uf"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-vox-blue focus:ring-1 focus:ring-vox-blue
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                  <div *ngIf="isFieldInvalid('empresa.endereco.ds_uf')" class="text-red-500 text-xs mt-1">
                    {{ getFieldError('empresa.endereco.ds_uf') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button type="button" (click)="goBack()"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200">
            Voltar
          </button>
          <button type="submit"
            class="px-4 py-2 bg-vox-blue-light text-white rounded-md hover:bg-vox-blue transition-colors duration-200">
            Solicitar
          </button>
        </div>
      </form>
    </div>

    <!-- Modal de Sucesso -->
    <div *ngIf="showSuccessModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Sucesso!</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Solicitação cadastrada com sucesso
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button (click)="closeModal()"
              class="px-4 py-2 bg-vox-blue-light text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-vox-blue focus:outline-none focus:ring-2 focus:ring-vox-blue-light">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CreateRequestComponent {
  requestForm: FormGroup;
  showSuccessModal = false;
  cepError: string = '';
  isLoadingCep = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyRequestService: CompanyRequestService,
    private cepService: CepService
  ) {
    this.requestForm = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', [Validators.required, Validators.minLength(3)]],
        nu_cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
        date_nascimento: ['', [Validators.required]]
      }),
      empresa: this.fb.group({
        ds_nome_fantasia: ['', [Validators.required, Validators.minLength(3)]],
        endereco: this.fb.group({
          co_cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
          ds_logradouro: ['', [Validators.required]],
          co_numero: ['', [Validators.required]],
          ds_complemento: [''],
          ds_bairro: ['', [Validators.required]],
          ds_municipio: ['', [Validators.required]],
          ds_uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
        })
      })
    });
  }

  isFieldInvalid(fieldPath: string): boolean {
    const field = this.requestForm.get(fieldPath);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldPath: string): string {
    const field = this.requestForm.get(fieldPath);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['minlength'] || field.errors['maxlength']) return 'Tamanho inválido';
    }
    return '';
  }

  consultarCep() {
    const cep = this.requestForm.get('empresa.endereco.co_cep')?.value;
    if (!cep) return;

    this.cepError = '';
    this.isLoadingCep = true;
    
    this.cepService.consultarCep(cep).subscribe({
      next: (response) => {
        setTimeout(() => {
          const enderecoGroup = this.requestForm.get('empresa.endereco');
          if (enderecoGroup) {
            enderecoGroup.patchValue({
              ds_logradouro: response.logradouro,
              ds_bairro: response.bairro,
              ds_municipio: response.localidade,
              ds_uf: response.uf
            });
          }
          this.isLoadingCep = false;
        }, 2000);
      },
      error: (error) => {
        setTimeout(() => {
          this.cepError = error.message;
          this.isLoadingCep = false;
        }, 2000);
      }
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const newRequest = {
        id: Date.now().toString(),
        ...formValue
      };
      
      this.companyRequestService.addCompanyRequest(newRequest);
      this.showSuccessModal = true;
    } else {
      Object.keys(this.requestForm.controls).forEach(key => {
        const control = this.requestForm.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            const subControl = control.get(subKey);
            if (subControl instanceof FormGroup) {
              Object.keys(subControl.controls).forEach(nestedKey => {
                subControl.get(nestedKey)?.markAsTouched();
              });
            } else {
              subControl?.markAsTouched();
            }
          });
        } else {
          control?.markAsTouched();
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  closeModal() {
    this.showSuccessModal = false;
    this.goBack();
  }
} 