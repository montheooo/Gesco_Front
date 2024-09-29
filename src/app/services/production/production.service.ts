import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  //backendUrl = 'https://gescofunctionaz.azurewebsites.net/api' ;
  backendUrl = 'http://localhost:7209/api' ;

  constructor(private http:HttpClient) {

  }

  getAllProduction(){

    return this.http.get(this.backendUrl+'/production')
  }
}
