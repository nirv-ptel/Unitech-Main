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
  ViewIndentWithFilter(Filter: any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store/req/getAllByIndent`,Filter);
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

  priceIdUpdate(indentId: number, priceId: number): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/req/update/vendorPrice/${priceId}/${indentId}`,null);
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

  ViewFinalDataAdmin(venderId: number, itemId: number, indentId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/price/item/${venderId}/${itemId}/${indentId}`);
  }

  PvenderPriceUpdate(priceId: number, price: any): Observable<any> {
    return this.http.patch(`${this.url}/api/v1/store/req/update/PvendorPrice/${priceId}`, price);
  }

  createPo(Po: any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store/po/d`,Po);
  }

  ViewPO(page: number, pagesize: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/po/getAll?page=${page}&pagesize=${pagesize}`);
  }

  ViewPoById(Po: any): Observable<any> {
    return this.http.get(`${this.url}/api/v1/store/po/getById/${Po}`);
  }
  ViewPoFilter(Filter: any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/store/po/searchingInPo`,Filter);
  }

}