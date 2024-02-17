import { Routes } from '@angular/router';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

];
