import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { InvoiceData } from '../../models/invoiceData';
import { Invoice } from '../../models/invoice';
import { InvoiceDTO } from '../../modelsDTO/invoiceDTO';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListService {

  backendUrl = 'https://gescofunctionaz.azurewebsites.net/api' ;
  //backendUrl = 'http://localhost:7209/api' ;

  constructor(private http:HttpClient) { }

  getRecent<Invoice>() {

    return this.http.get<Invoice>(this.backendUrl+'/invoices/get-invoice')
  }

  getInvoiceData<InvoiceData>(){

    return this.http.get<InvoiceData>(this.backendUrl+'/invoices/add-invoice-data')
  }

  postInvoiceData<InvoiceDTO>(invoice:InvoiceDTO){

    return this.http.post<InvoiceDTO>(this.backendUrl+'/invoices/post-invoice', invoice)
  }

}

