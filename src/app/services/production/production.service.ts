import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private http:HttpClient) {

  }

  getAllProduction(){

    return this.http.get(`http://localhost:5140/production`).pipe(
      tap(),
      take(1)
    )
  }
}
