import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class LapformerService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/lapformer`;

  LapformerParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAone/${Mid}`, Para);
  }
  LapformerParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftATwo/${Mid}`, Para);
  }
  LapformerParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBOne/${Mid}`, Para);
  }
  LapformerParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBTwo/${Mid}`, Para);
  }

}
