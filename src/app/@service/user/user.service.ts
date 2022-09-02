import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech`;

  ViewRole(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/user/role/role`);
  }

  CreateUserProfile(userProfile:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/user/signup`,userProfile);
  }

  CreateUserPassword(userPassword:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/user/password`,userPassword);
  }
  userPasswordAssign(Pid:any,Uid:any):Observable<any> {
    return this.http.put(`${this.url}/api/v1/user/${Pid}/IdUpdatePass/${Uid}`,"");
  }

  CreateUserQualification(userQualification:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/qualification/create`,userQualification);
  }
  userQualificationAssign(Qid:any,Uid:any):Observable<any> {
    return this.http.put(`${this.url}/api/v1/user/${Qid}/quaTouser/${Uid}`,"");
  }

  CreateUserExperience(userExperience:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/employeeExperience/create`,userExperience);
  }
  userExperienceAssign(Eid:any,Uid:any):Observable<any> {
    return this.http.put(`${this.url}/api/v1/user/${Eid}/expTouser/${Uid}`,"");
  }

  CreateUserFamily(userFamily:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/familyDetails/create`,userFamily);
  }
  userFamilyAssign(Fid:any,Uid:any):Observable<any> {
    return this.http.put(`${this.url}/api/v1/user/${Fid}/familyDetailsToUser/${Uid}`,"");
  }

  CreateUserHrConformation(hrConformation:any): Observable<any> {
    return this.http.post(`${this.url}/api/v1/hr/create`,hrConformation);
  }
  userHrConformationAssign(Hid:any,Uid:any):Observable<any> {
    return this.http.put(`${this.url}/api/v1/user/${Hid}/hrfilldataTouser/${Uid}`,"");
  }

  ViewAllUserProfile(): Observable<any> {
    return this.http.post(`${this.url}/api/v1/user/user/findAll`,'');
  }

  ViewUserProfile(Uid:any): Observable<any> {
    return this.http.get(`${this.url}/api/v1/user/${Uid}`)
  }



}
