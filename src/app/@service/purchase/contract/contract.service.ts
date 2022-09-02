import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/purchase/contract`;

  CreateContract(contract:any): Observable<any> {
    return this.http.post(`${this.url}/save`,contract);
  }

  ViewContract(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  ContractVender(Vid:any,Cid:any):Observable<any> {
    return this.http.put(`${this.url}/${Vid}/updatevendor/${Cid}`,"");
  }

  ContractItem(Iid:any,Cid:any):Observable<any> {
    return this.http.put(`${this.url}/${Iid}/updateitem/${Cid}`,"");
  }
}
