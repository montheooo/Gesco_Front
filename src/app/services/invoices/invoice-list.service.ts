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

  backendUrl = 'https://gescoapiappservice.azurewebsites.net' ;
  //backendUrl = 'http://localhost:5140' ;

  constructor(private http:HttpClient) { }

  getRecent() {

    return this.http.get(this.backendUrl+'/invoices').pipe(
      tap(),
      take(1)
    )


  }

  getInvoiceData<InvoiceData>(){

    return this.http.get<InvoiceData>(this.backendUrl+'/invoices/add-invoice-data').pipe(
      tap(), take(1)
    )
  }

  postInvoiceData<InvoiceDTO>(invoice:InvoiceDTO){

    return this.http.post<InvoiceDTO>(this.backendUrl+'/invoices/post-invoice', invoice).pipe(
      tap(), take(1)
    )
  }

}

