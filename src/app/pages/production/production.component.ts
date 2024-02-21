import { Component, inject } from '@angular/core';
import { NavProductionComponent } from '../../layout/nav-production/nav-production.component';
import { DatePipe, NgFor } from '@angular/common';
import { ProductionService } from '../../services/production/production.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FactureModal } from '../../modals/production/FactureModal';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [NavProductionComponent, NgFor, DatePipe],
  templateUrl: './production.component.html',
  styleUrl: './production.component.css'
})
export class ProductionComponent {

  private modalService = inject(NgbModal);
  productions:any ;

  constructor(private productionService:ProductionService){

  }

  ngOnInit(): void {

    this.productionService.getAllProduction().subscribe(
      (data)=>{
        console.log(data);
        this.productions = data ;
      })
  }

  open(production:any) {
		const modalRef = this.modalService.open(FactureModal, { size: 'lg', centered:true, scrollable:true });
    console.log(production);
    modalRef.componentInstance.production= production;
	}

}
