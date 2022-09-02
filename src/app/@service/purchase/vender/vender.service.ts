import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class VenderService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/purchase/vendor`;

  CreateVender(vender:any): Observable<any> {
    return this.http.post(`${this.url}`,vender);
  }

  ViewVender(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  ViewVenderById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
