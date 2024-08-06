import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-ventes',
  standalone: true,
  imports: [RouterLink, NgbCollapse],
  templateUrl: './nav-ventes.component.html',
  styleUrl: './nav-ventes.component.css'
})
export class NavVentesComponent {

  isMenuCollapsed:boolean = true ;
  title:string = "Menu"

}
