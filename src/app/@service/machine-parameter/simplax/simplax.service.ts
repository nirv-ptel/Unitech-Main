import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class SimplaxService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/simplex`;

  SimplexParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAone/${Mid}`, Para);
  }
  SimplexParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftATwo/${Mid}`, Para);
  }
  SimplexParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBOne/${Mid}`, Para);
  }
  SimplexParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBTwo/${Mid}`, Para);
  }

}
