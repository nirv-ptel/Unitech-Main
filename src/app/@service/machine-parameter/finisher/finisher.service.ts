import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class FinisherService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/finisher`;
  url1 = `${apiUrl.url}/unitech/api/v1/machine/finisherperhank`;

  FinisherParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftAOne/${Mid}`, Para);
  }
  FinisherParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftATwo/${Mid}`, Para);
  }
  FinisherParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBOne/${Mid}`, Para);
  }
  FinisherParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBTwo/${Mid}`, Para);
  }

  FinisherParameterHankShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftAOne/${Mid}`, Para);
  }
  FinisherParameterHankShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftATwo/${Mid}`, Para);
  }
  FinisherParameterHankShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftBOne/${Mid}`, Para);
  }
  FinisherParameterHankShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftBTwo/${Mid}`, Para);
  }
}
