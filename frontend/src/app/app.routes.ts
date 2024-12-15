import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/account/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent, canActivate: [guestGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]}
];