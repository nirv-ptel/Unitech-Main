import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1`;

  CreatePurchase(purchase:any): Observable<any> {
    return this.http.post(`${this.url}/purchase/create`,purchase);
  }

  ViewPurchase(): Observable<any> {
    return this.http.get(`${this.url}/purchase/findall`);
  }
}
