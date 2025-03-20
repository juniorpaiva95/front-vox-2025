import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ModalType = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full" [ngClass]="getIconClass()">
            <ng-content select="[icon]"></ng-content>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">{{ title }}</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              <ng-content></ng-content>
            </p>
          </div>
          <div class="items-center px-4 py-3 flex gap-3">
            <button *ngIf="showCancelButton" (click)="onCancel()"
              class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              {{ cancelButtonText }}
            </button>
            <button (click)="onConfirm()"
              class="flex-1 px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2"
              [ngClass]="getConfirmButtonClass()">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() type: ModalType = 'success';
  @Input() confirmButtonText = 'OK';
  @Input() cancelButtonText = 'Cancelar';
  @Input() showCancelButton = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  getIconClass(): string {
    const classes = {
      success: 'bg-green-100',
      warning: 'bg-yellow-100',
      danger: 'bg-red-100',
      info: 'bg-blue-100'
    };
    return classes[this.type];
  }

  getConfirmButtonClass(): string {
    const classes = {
      success: 'bg-vox-blue-light hover:bg-vox-blue focus:ring-vox-blue-light',
      warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    };
    return classes[this.type];
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
} 