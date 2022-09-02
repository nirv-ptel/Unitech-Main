import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

export let  demo: any ;

@Injectable({
  providedIn: 'root'
})
export class TimeGetService {
  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewTime(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/user/time`);
  }


}
