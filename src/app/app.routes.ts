import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreateRequestComponent } from './features/company-request/create/create.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ViewRequestComponent } from './features/company-request/view/view.component';
import { EditRequestComponent } from './features/company-request/edit/edit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-request/create',
    component: CreateRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-request/view/:id',
    component: ViewRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-request/edit/:id',
    component: EditRequestComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
