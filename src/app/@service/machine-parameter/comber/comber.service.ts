import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class ComberService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine/comber`;

  ComberParameterShiftAOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftAOne/${Mid}`, Para);
  }
  ComberParameterShiftATwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftATwo/${Mid}`, Para);
  }
  ComberParameterShiftBOne(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBOne/${Mid}`, Para);
  }
  ComberParameterShiftBTwo(Mid: any, Para: any): Observable<any> {
    return this.http.patch(`${this.url}/updateShiftBTwo/${Mid}`, Para);
  }

}
