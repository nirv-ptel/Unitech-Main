import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class IndentService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewIndent(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req`);
  }
  ViewIndentPaginasion(page: number, pagesize: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req/page/?page=${page}&pagesize=${pagesize}`);
  }

  CreateIndent(indent: any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store/req`, indent);
  }

  ViewIndentStatus(status: string): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req/Istatus?indentStatus=${status}`);
  }

  IndentFindById(indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req/${indentId}`);
  }

  StatusUpdateIndent(indentId: number, indent: any): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/req/${indentId}`, indent);
  }

  IndentIdAddQuantity(indentId: number, quantityId: any): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/req/update/${indentId}/${quantityId}`);
  }

  IndentEstimetedPrice(itemId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/quantity/getBy/${itemId}`);
  }

  ApprovelStatusHChange(indentId: number, indent: any): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/req/${indentId}`, indent);
  }

  ApprovelRecord(indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/eve/${indentId}`);
  }

  ViewVenderById(indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/price/indent/${indentId}`);
  }

  ViewVenderByIdItemId(indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/price/item/${indentId}`);
  }

  ViewVenderByIdVenderId(indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/price/price/${indentId}`);
  }

}