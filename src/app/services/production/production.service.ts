import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  backendUrl = 'https://gescoapiappservice.azurewebsites.net' ;
  //backendUrl = 'http://localhost:5140' ;

  constructor(private http:HttpClient) {

  }

  getAllProduction(){

    return this.http.get(this.backendUrl+'/production').pipe(
      tap(),
      take(1)
    )
  }
}
