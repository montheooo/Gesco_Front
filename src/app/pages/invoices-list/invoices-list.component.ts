import { Component, OnInit, inject } from '@angular/core';
import { InvoiceListService } from '../../services/invoices/invoice-list.service';
import { Invoice } from '../../models/invoice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe, NgFor } from '@angular/common';
import { NavProductionComponent } from "../../layout/nav-production/nav-production.component";
import { NavVentesComponent } from "../../layout/nav-ventes/nav-ventes.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LigneFactureVentesModal } from '../../modals/ventes/LigneFactureModal';

@Component({
    selector: 'app-invoices-list',
    standalone: true,
    providers: [
        HttpClientModule
    ],
    templateUrl: './invoices-list.component.html',
    styleUrl: './invoices-list.component.css',
    imports: [NgFor, NavProductionComponent, NavVentesComponent, DatePipe]
})
export class InvoicesListComponent implements OnInit {

  private modalService = inject(NgbModal);

  invoices:any;

  constructor(private invoiceListService:InvoiceListService ){
  }

  ngOnInit(): void {

    this.invoiceListService.getRecent().subscribe(
      (data)=>{
        console.log(data);
        this.invoices = data ;
      })
  }

  open(facture:any) {

    const modalRef = this.modalService.open(LigneFactureVentesModal, { size: 'lg', centered:true, scrollable:true });
    console.log(facture);
    modalRef.componentInstance.facture= facture;
  }

}
