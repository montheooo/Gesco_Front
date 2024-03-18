import { Routes } from '@angular/router';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { ProductionComponent } from './pages/production/production.component';
import { VenteComponent } from './pages/vente/vente.component';
import { RapportComponent } from './pages/rapport/rapport.component';
import { StockComponent } from './pages/stock/stock.component';
import { InvoicesAddComponent } from './pages/invoices-add/invoices-add.component';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invoices-list', component: InvoicesListComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'vente', component: VenteComponent },
  { path: 'rapport', component: RapportComponent },
  { path: 'stock', component: StockComponent },
  { path: 'invoices-add', component: InvoicesAddComponent },

];
