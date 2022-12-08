import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-set-parameter',
  templateUrl: './set-parameter.component.html',
  styleUrls: ['./set-parameter.component.scss']
})
export class SetParameterComponent implements OnInit {


  shiftToday: Date;
  A1shiftToday: boolean = false;
  A2shiftToday: boolean = false;
  B1shiftToday: Date;
  B2shiftToday: Date;

  currentDate: string;

  constructor(protected dateService: NbDateService<Date>, private datePipe: DatePipe) {
    this.shiftToday = this.dateService.addHours(this.dateService.today(),-8);

    this.currentDate = this.dateService.format(this.dateService.today(),'dd-MM-yyyy');
    let date = this.dateService.today();
    date = this.dateService.setHours(date,14);
    date = this.dateService.setMinutes(date,15);
    date = this.dateService.setSeconds(date,0);
    date = this.dateService.setMilliseconds(date,0);
    if(date.getTime() > this.dateService.today().getTime()) {
      this.A1shiftToday = true;
      this.A2shiftToday = false;
    }
    let a= this.dateService.compareDates(date,this.dateService.today());
  }

  ngOnInit(): void {
  }

}
