import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CepService } from '../../../core/services/cep.service';
import { MockDataService } from '../../../core/services/mock-data.service';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { companyRequests, updateCompanyRequest } from '../state/company-request.state';

@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, ModalComponent],
  providers: [provideNgxMask()],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditRequestComponent implements OnInit {
  requestForm: FormGroup;
  showSuccessModal = false;
  requestId!: string;
  isLoadingCep = false;
  cepError: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private cepService: CepService,
    private mockDataService: MockDataService
  ) {
    this.requestForm = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', [Validators.required, Validators.minLength(3)]],
        nu_cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
        date_nascimento: ['', Validators.required]
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

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    const request = companyRequests().find(r => r.id === this.requestId);
    
    if (!request) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.requestForm.patchValue({
      solicitante: {
        ds_responsavel: request.solicitante.ds_responsavel,
        nu_cpf: request.solicitante.nu_cpf,
        date_nascimento: request.solicitante.date_nascimento
      },
      empresa: {
        ds_nome_fantasia: request.empresa.ds_nome_fantasia,
        endereco: {
          co_cep: request.empresa.endereco.co_cep,
          ds_logradouro: request.empresa.endereco.ds_logradouro,
          co_numero: request.empresa.endereco.co_numero,
          ds_complemento: request.empresa.endereco.ds_complemento,
          ds_bairro: request.empresa.endereco.ds_bairro,
          ds_municipio: request.empresa.endereco.ds_municipio,
          ds_uf: request.empresa.endereco.ds_uf
        }
      }
    });
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
      const updatedRequest = {
        ...this.requestForm.value,
        id: this.requestId,
        status: 'PENDENTE'
      };

      updateCompanyRequest(this.requestId, updatedRequest);
      this.showSuccessModal = true;
    } else {
      this.markFormGroupTouched(this.requestForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(path: string): string {
    const control = this.requestForm.get(path);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      if (path.includes('nu_cpf')) {
        return 'CPF inválido';
      }
      if (path.includes('co_cep')) {
        return 'CEP inválido';
      }
      return 'Formato inválido';
    }
    return '';
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/dashboard']);
  }
} 