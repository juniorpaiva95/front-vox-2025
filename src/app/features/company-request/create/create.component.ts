import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompanyRequestService } from '../../../core/services/company-request.service';
import { CepService } from '../../../core/services/cep.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { MockDataService } from '../../../core/services/mock-data.service';
import { addCompanyRequest } from '../state/company-request.state';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, ModalComponent],
  providers: [provideNgxMask()],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  showSuccessModal = false;
  cepError: string = '';
  isLoadingCep = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private companyRequestService: CompanyRequestService,
    private cepService: CepService,
    private mockDataService: MockDataService
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
          co_cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
          ds_logradouro: ['', Validators.required],
          co_numero: ['', Validators.required],
          ds_complemento: [''],
          ds_bairro: ['', Validators.required],
          ds_municipio: ['', Validators.required],
          ds_uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
        })
      })
    });
  }

  ngOnInit(): void {}

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

  consultarCep(): void {
    const cepControl = this.requestForm.get('empresa.endereco.co_cep');
    const cep = String(cepControl?.value).replace('-', '');
    
    if (!cep || cep.length !== 8) {
      this.cepError = 'CEP inválido';
      return;
    }

    this.isLoadingCep = true;
    this.cepError = '';

    setTimeout(() => {
      this.cepService.consultarCep(cep).subscribe({
        next: (response) => {
          this.isLoadingCep = false;
          this.cepError = '';
          this.requestForm.patchValue({
            empresa: {
              endereco: {
                ds_logradouro: response.logradouro,
                ds_bairro: response.bairro,
                ds_municipio: response.localidade,
                ds_uf: response.uf
              }
            }
          });
        },
        error: (error) => {
          this.isLoadingCep = false;
          this.cepError = 'Erro ao consultar CEP. Tente novamente.';
          console.error('Erro ao consultar CEP:', error);
        }
      });
    }, 1500);
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const request = {
        id: Date.now().toString(),
        ...this.requestForm.value,
        status: 'pending'
      };

      this.mockDataService.addCompanyRequest(request);
      addCompanyRequest(request);
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

  closeModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/dashboard']);
  }

  getErrorMessage(controlPath: string): string {
    const control = this.requestForm.get(controlPath);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (control?.hasError('pattern')) {
      if (controlPath.includes('nu_cpf')) {
        return 'CPF inválido';
      }
      if (controlPath.includes('co_cep')) {
        return 'CEP inválido';
      }
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'UF deve ter 2 caracteres';
    }
    if (control?.hasError('cepInvalido')) {
      return 'CEP não encontrado';
    }
    return '';
  }
} 