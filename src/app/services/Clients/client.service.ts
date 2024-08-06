import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  backendUrl = 'https://gescofunctionaz.azurewebsites.net/api' ;
  //backendUrl = 'http://localhost:7209/api' ;

  getRecent<Invoice>() {

    return this.http.get<Invoice>(this.backendUrl+'/clients/get-clients')
  }

  postClient<Client>(client:Client){

    return this.http.post<Client>(this.backendUrl+'/clients/post-client', client)
  }

  deleteclient<Client>(client:Client){

    return this.http.post<Client>(this.backendUrl+'/clients/delete-client', client)
  }
}
