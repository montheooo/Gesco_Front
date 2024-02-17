import { Routes } from '@angular/router';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invoices-list', component: InvoicesListComponent },

];
