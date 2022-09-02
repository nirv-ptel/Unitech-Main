import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TimeGetService } from "../../@service/timeGet/time-get.service";

@Injectable()
export class TimeResolve implements Resolve<any> {
    time: any;
    constructor(private timeGet: TimeGetService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.timeGet.ViewTime();
    }

}