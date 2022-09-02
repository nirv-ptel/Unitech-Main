import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';
@Injectable({
  providedIn: 'root'
})
export class MachineParameterService {
  logError: any;
  log: any;

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/unitech/api/v1/machine`;

  AddBloowRoomParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/bloowroom/save`, machinepara);
  }
  AddCardingParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/carding/save`, machinepara);
  }
  AddDrawframesParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/drawframes/save`, machinepara);
  }
  AddDrawframesHankParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/drawframesperhank/save`, machinepara);
  }
  AddFinisherParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/finisher/save`, machinepara);
  }
  AddFinisherHankParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/finisherperhank/save`, machinepara);
  }
  AddSimplexParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/simplex/save`, machinepara);
  }
  AddRingframeParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/ringframe/save`, machinepara);
  }
  AddWindingParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/winding/save`, machinepara);
  }
  AddPackingParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/packing/save`, machinepara);
  }
  AddUtilityParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/utility/save`, machinepara);
  }
  AddWasteroomParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/wasteroom/save`, machinepara);
  }
  AddComberParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/comber/save`, machinepara);
  }
  AddLapformerParameter(machinepara: any): Observable<any> {
    return this.http.post(`${this.url}/lapformer/save`, machinepara);
  }

  AssignBloowRoomParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/bloowroom/${Mid}/update/${Pid}`, "");
  }
  AssignCardingParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/carding/${Mid}/update/${Pid}`, "");
  }
  AssignDrawframesParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/drawframes/${Mid}/update/${Pid}`, "");
  }
  AssignDrawframesHankParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/drawframesperhank/${Mid}/update/${Pid}`, "");
  }
  AssignFinisherParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/finisher/${Mid}/update/${Pid}`, "");
  }
  AssignFinisherHankParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/finisherperhank/${Mid}/update/${Pid}`, "");
  }
  AssignSimplexParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/simplex/${Mid}/update/${Pid}`, "");
  }
  AssignRingframeParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/ringframe/${Mid}/update/${Pid}`, "");
  }
  AssignWindingParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/winding/${Mid}/update/${Pid}`, "");
  }
  AssignPackingParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/packing/${Mid}/update/${Pid}`, "");
  }
  AssignUtilityParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/utility/${Mid}/update/${Pid}`, "");
  }
  AssignWasteroomParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/wasteroom/${Mid}/update/${Pid}`, "");
  }
  AssignComberParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/comber/${Mid}/update/${Pid}`, "");
  }
  AssignLapformerParameter(Mid: any, Pid: any): Observable<any> {
    return this.http.put(`${this.url}/lapformer/${Mid}/update/${Pid}`, "");
  }

  DateSingleBloowRoom(Date: any): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/searchsingle?start=${Date}`);
  }
  DateSingleCarding(Date: any): Observable<any> {
    return this.http.get(`${this.url}/carding/searchsingle?start=${Date}`);
  }
  DateSingleDrawframesKG(Date: any): Observable<any> {
    return this.http.get(`${this.url}/drawframes/searchsingle?start=${Date}`);
  }
  DateSingleDrawframesHANK(Date: any): Observable<any> {
    return this.http.get(`${this.url}/drawframesperhank/searchsingle?start=${Date}`);
  }
  DateSingleFinisherKG(Date: any): Observable<any> {
    return this.http.get(`${this.url}/finisher/searchsingle?start=${Date}`);
  }
  DateSingleFinisherHANK(Date: any): Observable<any> {
    return this.http.get(`${this.url}/finisherperhank/searchsingle?start=${Date}`);
  }
  DateSingleSimplex(Date: any): Observable<any> {
    return this.http.get(`${this.url}/simplex/searchsingle?start=${Date}`);
  }
  DateSingleRingframe(Date: any): Observable<any> {
    return this.http.get(`${this.url}/ringframe/searchsingle?start=${Date}`);
  }
  DateSingleComber(Date: any): Observable<any> {
    return this.http.get(`${this.url}/comber/searchsingle?start=${Date}`);
  }
  DateSingleLapformer(Date: any): Observable<any> {
    return this.http.get(`${this.url}/lapformer/searchsingle?start=${Date}`);
  }

  DateBloowRoom(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/search?start=${start}&end=${end}`);
  }
  DownloadBloowRoom(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleBloowRoom(date: any): Observable<any> {
    return this.http.get(`${this.url}/bloowroom/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateCarding(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/carding/search?start=${start}&end=${end}`);
  }
  DownloadCarding(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/carding/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleCarding(date: any): Observable<any> {
    return this.http.get(`${this.url}/carding/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateSimplax(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/simplex/search?start=${start}&end=${end}`);
  }
  DownloadSimplax(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/simplex/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleSimplax(date: any): Observable<any> {
    return this.http.get(`${this.url}/simplex/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateComber(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/comber/search?start=${start}&end=${end}`);
  }
  DownloadComber(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/comber/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleComber(date: any): Observable<any> {
    return this.http.get(`${this.url}/comber/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateLapformer(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/lapformer/search?start=${start}&end=${end}`);
  }
  DownloadLapformer(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/lapformer/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleLapformer(date: any): Observable<any> {
    return this.http.get(`${this.url}/lapformer/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateRingframe(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/ringframe/search?start=${start}&end=${end}`);
  }
  DownloadRingframe(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/ringframe/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleRingframe(date: any): Observable<any> {
    return this.http.get(`${this.url}/ringframe/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateDrawframeKG(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/drawframes/search?start=${start}&end=${end}`);
  }
  DownloadDrawframeKG(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/drawframes/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleDrawframeKG(date: any): Observable<any> {
    return this.http.get(`${this.url}/drawframes/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateDrawframeHANK(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/drawframesperhank/search?start=${start}&end=${end}`);
  }
  DownloadDrawframeHANK(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/drawframesperhank/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleDrawframeHANK(date: any): Observable<any> {
    return this.http.get(`${this.url}/drawframesperhank/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateFinisherKG(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/finisher/search?start=${start}&end=${end}`);
  }
  DownloadFinisherKG(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/finisher/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleFinisherKG(date: any): Observable<any> {
    return this.http.get(`${this.url}/finisher/downloadSingle?start=${date}`, { responseType: 'blob' })
  }

  DateFinisherHANK(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/finisherperhank/search?start=${start}&end=${end}`);
  }
  DownloadFinisherHANK(start: any, end: any): Observable<any> {
    return this.http.get(`${this.url}/finisherperhank/download?start=${start}&end=${end}`, { responseType: 'blob' })
  }
  DownloadSingleFinisherHANK(date: any): Observable<any> {
    return this.http.get(`${this.url}/finisherperhank/downloadSingle?start=${date}`, { responseType: 'blob' })
  }
}
