import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewCategory(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/pCategory`);
  }

  CreateCategory(category:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/pCategory`,category);
  }
}
