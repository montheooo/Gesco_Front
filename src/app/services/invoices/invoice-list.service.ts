import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListService {

  constructor(private http:HttpClient) { }

  getRecent() {

    return this.http.get(`http://localhost:5140/invoices`).pipe(
      tap(),
      take(1)
    )
  }
}
