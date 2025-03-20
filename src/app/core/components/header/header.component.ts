import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-vox-blue-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <img class="h-8 w-auto" src="assets/images/vox-logo.svg" alt="Vox Tecnologia">
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {} 