import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/addmachine`;
  // url = 'http://localhost:9090/unitech/api/v1/addmachine';

  CreateBloowRoom(machine:any): Observable<any> {
    return this.http.post(`${this.url}/bloowroom`,machine);
  }
  CreateCarding(machine:any): Observable<any> {
    return this.http.post(`${this.url}/carding/save`,machine);
  }
  CreateDrawframes(machine:any): Observable<any> {
    return this.http.post(`${this.url}/drawframes/save`,machine);
  }
  CreateFinisher(machine:any): Observable<any> {
    return this.http.post(`${this.url}/finisher/save`,machine);
  }
  CreateSimplex(machine:any): Observable<any> {
    return this.http.post(`${this.url}/simplex/save`,machine);
  }
  CreateRingframe(machine:any): Observable<any> {
    return this.http.post(`${this.url}/ringframes/save`,machine);
  }
  CreateWinding(machine:any): Observable<any> {
    return this.http.post(`${this.url}/winding/save`,machine);
  }
  CreatePacking(machine:any): Observable<any> {
    return this.http.post(`${this.url}/packing/save`,machine);
  }
  CreateUtility(machine:any): Observable<any> {
    return this.http.post(`${this.url}/utillity/save`,machine);
  }
  CreateWasteroom(machine:any): Observable<any> {
    return this.http.post(`${this.url}/wasteroom/save`,machine);
  }
  CreateCombers(machine:any): Observable<any> {
    return this.http.post(`${this.url}/comber/save`,machine);
  }
  CreateLapformer(machine:any): Observable<any> {
    return this.http.post(`${this.url}/lapformer/save`,machine);
  }

  ViewAllBloowRoom(): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/all`);
  }
  ViewAllCarding(): Observable<any> {
    return this.http.get(`${this.url}/carding/all`);
  }
  ViewAllDrawframes(): Observable<any> {
    return this.http.get(`${this.url}/drawframes/all`);
  }
  ViewAllFinisher(): Observable<any> {
    return this.http.get(`${this.url}/finisher/all`);
  }
  ViewAllSimplex(): Observable<any> {
    return this.http.get(`${this.url}/simplex/all`);
  }
  ViewAllRingframe(): Observable<any> {
    return this.http.get(`${this.url}/ringframes/all`);
  }
  ViewAllWinding(): Observable<any> {
    return this.http.get(`${this.url}/winding/all`);
  }
  ViewAllPacking(): Observable<any> {
    return this.http.get(`${this.url}/packing/all`);
  }
  ViewAllUtility(): Observable<any> {
    return this.http.get(`${this.url}/utillity/all`);
  }
  ViewAllWasteroom(): Observable<any> {
    return this.http.get(`${this.url}/wasteroom/all`);
  }
  ViewAllCombers(): Observable<any> {
    return this.http.get(`${this.url}/comber/all`);
  }
  ViewAllLapformer(): Observable<any> {
    return this.http.get(`${this.url}/lapformer/all`);
  }

  ViewOneBloowRoom(Mid:any): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/${Mid}`);
  }

  StatusAllBloowRoom(status: boolean): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/status/?status=${status}`);
  }

}
