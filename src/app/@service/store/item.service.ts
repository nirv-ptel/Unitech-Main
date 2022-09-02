import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewItem(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store`);
  }

  CreateItem(item: any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store`, item);
  }

  UpdateItem(item: any,itemId: number): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/up/${itemId}`, item);
  }

  FindByIdItem(id: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/${id}`);
  }

  StockUpdateItem(id: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/update/${id}/${quantity}`, '');
  }

  ItemUpload(file: any): Observable<any> {

    return this.http.post(`${apiUrl.url}/db/exc`, file,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
}
