import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbColorHelper, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbThemeService, NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import * as fileSaver from 'file-saver';
import { LoginService } from '../../../../../@service/auth/login.service';
import { BloowroomService } from '../../../../../@service/machine-parameter/blooroom/bloowroom.service';
import { MachineParameterService } from '../../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../../@service/machine/machine.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-bloowroom',
  templateUrl: './bloowroom.component.html',
  styleUrls: ['./bloowroom.component.scss']
})

export class BloowroomComponent implements OnInit {

  demo: any;
  chart = [];
  name = [];
  reding0 = [];
  redingA = [];
  redingB = [];
  redingC = [];
  redingD = [];

  NbDialogRef = null;

  private regex: RegExp = new RegExp('^[0-9]*$');

  admin: boolean = false;
  superviser: boolean = false;
  qc: boolean = false;

  MachineNotFounderror: boolean = false;
  QcMachineParameterNotSetError: boolean = false;

  SingleDate: FormGroup;
  TwoDate: FormGroup;
  bloowroompara: FormGroup;
  bloowroomparameterAone: FormGroup;
  bloowroomparameterAtwo: FormGroup;
  bloowroomparameterBone: FormGroup;
  bloowroomparameterBtwo: FormGroup;

  bloowroom: any;

  qcokay: boolean = false;
  qcdataokay: boolean = false;

  adminTwoDate: boolean = false;
  adminOneDate: boolean = false;

  shiftA1: boolean = false;
  shiftA2: boolean = false;
  shiftB1: boolean = false;
  shiftB2: boolean = false;
  shiftData: boolean = false;
  shiftData1: boolean = false;

  time: any;
  todayDate: any;
  intervalId;
  subscription: Subscription;

  source: any = [];
  source1: any = [];
  source2: any = [];
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      addBloowroom: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addBloowroom.name;
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },

      deliveryspeed: {
        title: 'DELIVERY SPEED',
        type: 'number',
      },
      silverhank: {
        title: 'SILVER HANK',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICENCY',
        type: 'number',
      },
      productiononratekgcardperhour: {
        title: 'PRODUCTION ON RATE +(KG/CARD/HOUR)',
        type: 'number',
      },
      machineefficencykgcardpershift: {
        title: 'PRODUCTION ON RATE (KG/CARD/SHIFT)',
        type: 'number',
      },
      machineefficencykgcardpersixhours: {
        title: 'PRODUCTION ON RATE (KG/CARD/6 HRS)',
        type: 'number',
      },
      machineefficencykgcardperday: {
        title: 'PRODUCTION ON RATE (KG/CARD/DAY)',
        type: 'number',
      },
    },
  };
  settings1 = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      addBloowroom: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addBloowroom.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      deliveryspeed: {
        title: 'DELIVERY SPEED',
        type: 'number',
      },
      silverhank: {
        title: 'SILVER HANK',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICENCY',
        type: 'number',
      },
      productiononratekgcardperhour: {
        title: 'PRODUCTION ON RATE +(KG/CARD/HOUR)',
        type: 'number',
      },
      machineefficencykgcardpershift: {
        title: 'PRODUCTION ON RATE (KG/CARD/SHIFT)',
        type: 'number',
      },
      machineefficencykgcardpersixhours: {
        title: 'PRODUCTION ON RATE (KG/CARD/6 HRS)',
        type: 'number',
      },
      machineefficencykgcardperday: {
        title: 'PRODUCTION ON RATE (KG/CARD/DAY)',
        type: 'number',
      },
    },
  };
  superviserViewData = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      addBloowroom: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addBloowroom.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      shift_a_sixHoursOne: {
        title: 'Shift A One',
        type: 'number',
      },
      shift_a_sixHoursTwo: {
        title: 'Shift A Two',
        type: 'number',
      },
      shift_b_sixHoursOne: {
        title: 'Shift B One',
        type: 'number',
      },
      shift_b_sixHoursTwo: {
        title: 'Shift B Two',
        type: 'number',
      },

    },
  };

  constructor(private post: MachineService,
    pipe: DecimalPipe,
    private _auth: LoginService,
    private MachinePara: MachineParameterService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private bloowroomAllPara: BloowroomService,
    private sanitizer: DomSanitizer,
    protected dateService: NbDateService<Date>,
    private theme: NbThemeService,
    private toastrService: NbToastrService,
    private timeGet: TimeGetService,
    private dialogService: NbDialogService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.data.forEach(data => {
      this.time = new Date(data.times);
    })

    this.intervalId = setInterval(() => {
      this.timeGet.ViewTime().subscribe((data: string) => {
        this.time = new Date(data);
      })
    }, 15000);

    this.todayDate = this.dateService.addHours(this.time, -8);
    this.todayDate = this.dateService.addMinutes(this.todayDate, -20);

    let Date8a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 00:00:00'));
    let Date2p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 06:00:00'));
    let Date8p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 12:00:00'));
    let Date2a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 18:00:00'));
    let nowDate = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd HH:mm:ss'));

    if ((Date8a < nowDate) && (nowDate < Date2p)) {
      this.shiftA1 = true;
    } else if ((Date2p < nowDate) && (nowDate < Date8p)) {
      this.shiftA2 = true;
    } else if ((Date8p < nowDate) && (nowDate < Date2a)) {
      this.shiftB1 = true;
    } else if (Date2a < nowDate) {
      this.shiftB2 = true;
    }

    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_SUPERVISOR') {
      this.superviser = true;
    } else if (role == 'ROLE_QC') {
      this.qc = true;
    }

    this.post.ViewAllBloowRoom().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if(a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.BloowroomGet.push(this.Bloowroom(data[i]));
      }
    });

    this.MachinePara.DateSingleBloowRoom(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.BloowroomParaAoneGet.push(this.BloowroomParaAone(data.Data[i]));
        this.BloowroomParaAtwoGet.push(this.BloowroomParaAtwo(data.Data[i]));
        this.BloowroomParaBoneGet.push(this.BloowroomParaBone(data.Data[i]));
        this.BloowroomParaBtwoGet.push(this.BloowroomParaBtwo(data.Data[i]));
        if (data.Data[i].shift_a_sixHoursOne == 0 && this.shiftA1) {
          this.shiftData = true;
        }
        if (data.Data[i].shift_a_sixHoursTwo == 0 && this.shiftA2) {
          this.shiftData = true;
        }
        if (data.Data[i].shift_b_sixHoursOne == 0 && this.shiftB1) {
          this.shiftData1 = true;
        }
        if (data.Data[i].shift_b_sixHoursTwo == 0 && this.shiftB2) {
          this.shiftData1 = true;
        }

        this.name.push(data.Data[i].addBloowroom.name);
        this.reding0.push(data.Data[i].machineefficencykgcardpersixhours);
        this.redingA.push(data.Data[i].shift_a_sixHoursOne);
        this.redingB.push(data.Data[i].shift_a_sixHoursTwo);
        this.redingC.push(data.Data[i].shift_b_sixHoursOne);
        this.redingD.push(data.Data[i].shift_b_sixHoursTwo);

      }

      if (this.admin && !this.MachineNotFounderror) {
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.name,
            datasets: [
              {
                label: 'QC set',
                data: this.reding0,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift A1',
                data: this.redingA,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgb(54, 162, 235, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift A2',
                data: this.redingB,
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(255, 205, 86, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift B1',
                data: this.redingC,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgb(153, 102, 255, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift B2',
                data: this.redingD,
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgb(255, 159, 64, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'sssss'
              }
            }
          },
        });
      }

      if (data.Data.length <= 0) {
        this.qcokay = true;
        this.qcdataokay = false;
      } else {
        this.qcdataokay = true;
        this.qcokay = false;
      }
    })

    this.bloowroompara = this.fb.group({
      bloowparaData: this.fb.array([]),
    });

    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });

    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.bloowroomparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.bloowroomparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.bloowroomparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.bloowroomparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
  }

  get BloowroomGet() {
    return this.bloowroompara.get('bloowparaData') as FormArray;
  }

  get BloowroomParaAoneGet() {
    return this.bloowroomparameterAone.get('parareading') as FormArray;
  }
  get BloowroomParaAtwoGet() {
    return this.bloowroomparameterAtwo.get('parareading') as FormArray;
  }
  get BloowroomParaBoneGet() {
    return this.bloowroomparameterBone.get('parareading') as FormArray;
  }
  get BloowroomParaBtwoGet() {
    return this.bloowroomparameterBtwo.get('parareading') as FormArray;
  }

  addParameter(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  Bloowroom(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      silverhank: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      addBloowroom: [Data],
    });
  }

  BloowroomParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  BloowroomParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  BloowroomParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  BloowroomParaBtwo(cc: any) {
    return this.fb.group({
      shift_b_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 110 && event.which != 190 && event.which != 8)) {
      event.preventDefault();
    }
  }

  onDateSingleSubmit() {
    let date = this.SingleDate.value.date;
    if (date != '') {
      this.MachinePara.DateSingleBloowRoom(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
        this.source1 = data.Data;
        if (data.Data.length > 0) {
          this.adminOneDate = true;
        } else {
          this.adminOneDate = false;
        }
      })
    }
  }
  onDateSubmit() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    if (start != '' && end != '') {
      this.MachinePara.DateBloowRoom(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
        this.source2 = data.Data;
        this.adminTwoDate = true;
        if (data.Data.length > 0) {
          this.adminTwoDate = true;
        } else {
          this.adminTwoDate = false;
        }
      }, (Error: any) => {
        alert("Date Invalid");
        this.adminTwoDate = false;
      })
    }
  }

  downloadSingle() {
    let start = this.SingleDate.value.date;
    this.MachinePara.DownloadSingleBloowRoom(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Bloowroom ' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadBloowRoom(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Bloowroom' + start + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onBloowroomSubmit() {
    this.bloowroompara.markAsDirty();
    let a = this.bloowroompara.value.bloowparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddBloowRoomParameter(a[i]).subscribe((data: any) => {
        this.bloowroompara.reset();
          this.ngOnInit();
      });
    }
    alert("Date Submited Success Fully...");
  }

  onBloowroomParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.bloowroomparameterAone.value.parareading.length; i++) {
      let Mid = this.bloowroomparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.bloowroomparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.bloowroomAllPara.BloowRoomParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.bloowroomparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onBloowroomParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.bloowroomparameterAtwo.value.parareading.length; i++) {
      let Mid = this.bloowroomparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.bloowroomparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }
      this.bloowroomAllPara.BloowRoomParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.bloowroomparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onBloowroomParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.bloowroomparameterBone.value.parareading.length; i++) {
      let Mid = this.bloowroomparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.bloowroomparameterBone.value.parareading[i].shift_b_sixHoursOne }
      this.bloowroomAllPara.BloowRoomParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.bloowroomparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onBloowroomParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.bloowroomparameterBtwo.value.parareading.length; i++) {
      let Mid = this.bloowroomparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.bloowroomparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }
      this.bloowroomAllPara.BloowRoomParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.bloowroomparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  allAlert(alertMsg, nameMachine, typeMachine) {
    const config = {
      status: alertMsg,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(
      `${typeMachine}`,
      `${nameMachine}`,
      config);
  }

}
