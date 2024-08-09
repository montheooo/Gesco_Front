import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depot } from '../../models/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http:HttpClient) { }

  //backendUrl = 'https://gescofunctionaz.azurewebsites.net/api' ;
  backendUrl = 'http://localhost:7209/api' ;

  getRecent<Depot>() {

    return this.http.get<Depot>(this.backendUrl+'/depots/get-depots')
  }

  postDepot<Depot>(depot:Depot){

    return this.http.post<Depot>(this.backendUrl+'/depots/post-depot', depot)
  }

  deleteDepot<Depot>(depot:Depot){

    return this.http.post<Depot>(this.backendUrl+'/depots/delete-depot', depot)
  }
}
