import { Component, OnInit } from '@angular/core';
import { InvoiceListService } from '../../services/invoices/invoice-list.service';
import { Invoice } from '../../models/invoice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NavProductionComponent } from "../../layout/nav-production/nav-production.component";

@Component({
    selector: 'app-invoices-list',
    standalone: true,
    providers: [
        HttpClientModule
    ],
    templateUrl: './invoices-list.component.html',
    styleUrl: './invoices-list.component.css',
    imports: [NgFor, NavProductionComponent]
})
export class InvoicesListComponent implements OnInit {

  constructor(private invoiceListService:InvoiceListService ){

  }
  invoices:any;

  ngOnInit(): void {

    this.invoiceListService.getRecent().subscribe(
      (data)=>{
        console.log(data);
        this.invoices = data ;
      })
  }

}
