import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { coreConfig } from './app/core/core.config';

bootstrapApplication(AppComponent, coreConfig)
  .catch(err => console.error(err));
