import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class DoService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/purchase/do`;

  CreateDo(Do:any): Observable<any> {
    return this.http.post(`${this.url}/save`,Do);
  }

  ViewDo(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }
}
