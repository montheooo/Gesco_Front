import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-production',
  standalone: true,
  imports: [RouterLink, NgbCollapse],
  templateUrl: './nav-production.component.html',
  styleUrl: './nav-production.component.css'
})
export class NavProductionComponent {

  isMenuCollapsed:boolean = false ;
  title:string = "Production"
}
