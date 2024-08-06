import { Component, OnInit, inject } from '@angular/core';
import { InvoiceListService } from '../../services/invoices/invoice-list.service';
import { Invoice } from '../../models/invoice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe, NgFor } from '@angular/common';
import { NavProductionComponent } from "../../layout/nav-production/nav-production.component";
import { NavVentesComponent } from "../../layout/nav-ventes/nav-ventes.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LigneFactureVentesModal } from '../../modals/ventes/LigneFactureModal';
import { InvoiceData } from '../../models/invoiceData';
import { InvoiceDTO } from '../../modelsDTO/invoiceDTO';
import { WarningDeleteModal } from '../../modals/ventes/WarningDeleteModal';
import { Router } from '@angular/router';


@Component({
    selector: 'app-invoices-list',
    standalone: true,
    templateUrl: './invoices-list.component.html',
    styleUrl: './invoices-list.component.css',
    imports: [NgFor, NavProductionComponent, NavVentesComponent, DatePipe]
})
export class InvoicesListComponent implements OnInit {

  private modalService = inject(NgbModal);

  invoices!: Invoice[];
  invoiceData!: InvoiceData;

  constructor(private invoiceListService:InvoiceListService, private router:Router ){
  }

  ngOnInit(): void {

    this.invoiceListService.getRecent<Invoice[]>().subscribe(
      (data)=>{
        console.log(data);
        this.invoices = data ;
      })

      this.invoiceListService.getInvoiceData<InvoiceData>().subscribe(
        data => this.invoiceData = data
      )
  }

  open(facture:Invoice) {

    const modalRef = this.modalService.open(LigneFactureVentesModal, { size: 'lg', centered:true, scrollable:true });
    console.log(facture);
    modalRef.componentInstance.facture = facture;
    modalRef.componentInstance.invoiceData = this.invoiceData;
  }

  openWarningDelete(facture:Invoice) {

    const modalRef = this.modalService.open(WarningDeleteModal, { size: 'sm', centered:true, scrollable:true });

    modalRef.componentInstance.invoice = facture;
    modalRef.componentInstance.deleteEvent.subscribe(

      (fac:Invoice) => {
       console.log(fac);

       this.invoices = this.invoices.filter((obj) => { return obj.numeroFacture !== fac.numeroFacture} );


      }
    )

  }

  goToInvoiceAdd(){
    this.router.navigate(['/invoices-add']);
  }

}
