import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full" [ngClass]="iconClass">
            <ng-content select="[icon]"></ng-content>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">{{ title }}</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              <ng-content></ng-content>
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button (click)="onClose()"
              class="px-4 py-2 bg-vox-blue-light text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-vox-blue focus:outline-none focus:ring-2 focus:ring-vox-blue-light">
              {{ buttonText }}
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
  @Input() buttonText = 'OK';
  @Input() iconClass = 'bg-green-100';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
} 