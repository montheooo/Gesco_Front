import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  //backendUrl = 'https://gescofunctionaz.azurewebsites.net/api' ;
  backendUrl = 'http://localhost:7209/api' ;

  getRecent<Invoice>() {

    return this.http.get<Invoice>(this.backendUrl+'/articles/get-articles')
  }

  postArticle<Client>(article:Article){

    return this.http.post<Article>(this.backendUrl+'/articles/post-article', article)
  }

  deletearticle<Article>(article:Article){

    return this.http.post<Article>(this.backendUrl+'/articles/delete-article', article)
  }
}
