import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class DrawframesService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/drawframes`;
  url1 = `${apiUrl.url}/unitech/api/v1/machine/drawframesperhank`;

  DrawframesParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftAOne/${Mid}`, Para);
  }
  DrawframesParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftATwo/${Mid}`, Para);
  }
  DrawframesParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBOne/${Mid}`, Para);
  }
  DrawframesParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBTwo/${Mid}`, Para);
  }

  DrawframesParameterHankShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftAOne/${Mid}`, Para);
  }
  DrawframesParameterHankShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftATwo/${Mid}`, Para);
  }
  DrawframesParameterHankShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftBOne/${Mid}`, Para);
  }
  DrawframesParameterHankShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url1}/updateShiftBTwo/${Mid}`, Para);
  }

}
