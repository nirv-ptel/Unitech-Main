import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class ResponceService {
  
  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewResponce(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/response`);
  }

  CreateResponce(responce:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/response`,responce);
  }

  ViewByStatusResponce(resStatus: string, pdiId: number): Observable<any> {
    return this.http.get(`${this.url}/api/v1/response/resAndPdi?resStatus=${resStatus}&pdiId=${pdiId}`);
  }
}
