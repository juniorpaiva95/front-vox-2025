import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'success' | 'danger' | 'info' | 'warning';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getBadgeClasses()">
      {{ text }}
    </span>
  `
})
export class BadgeComponent {
  @Input() text: string = '';
  @Input() variant: BadgeVariant = 'info';

  getBadgeClasses(): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-flex items-center justify-center';
    
    const variantClasses = {
      success: 'bg-green-100 text-green-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
} 