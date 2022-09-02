import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewUnit(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/unit`);
  }

  CreateUnit(unit:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/unit`,unit);
  }
}
