import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class RingframeService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/ringframe`;

  RingframeParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAOne/${Mid}`, Para);
  }
  RingframeParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftATwo/${Mid}`, Para);
  }
  RingframeParameterShiftAThree(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAThree/${Mid}`, Para);
  }
  RingframerParameterShiftAFour(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAFour/${Mid}`, Para);
  }
  RingframeParameterShiftAFive(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftAFive/${Mid}`, Para);
  }
  RingframeParameterShiftASix(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftASix/${Mid}`, Para);
  }


  RingframeParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBOne/${Mid}`, Para);
  }
  RingframeParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBTwo/${Mid}`, Para);
  }
  RingframeParameterShiftBThree(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBThree/${Mid}`, Para);
  }
  RingframeParameterShiftBFour(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBFour/${Mid}`, Para);
  }
  RingframeParameterShiftBFive(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBFive/${Mid}`, Para);
  }
  RingframeParameterShiftBSix(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateshiftBSix/${Mid}`, Para);
  }
}
