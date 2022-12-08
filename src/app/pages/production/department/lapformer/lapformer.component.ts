import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../@service/auth/login.service';
import { LapformerService } from '../../../../@service/machine-parameter/lapformer/lapformer.service';
import { MachineParameterService } from '../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-lapformer',
  templateUrl: './lapformer.component.html',
  styleUrls: ['./lapformer.component.scss']
})
export class LapformerComponent implements OnInit {

  chart = [];
  name = [];
  reding0 = [];
  redingA = [];
  redingB = [];
  redingC = [];
  redingD = [];

  demo: any;
  lapformer: any;
  private regex: RegExp = new RegExp('^[0-9]*$');

  time: any;
  todayDate: any;
  intervalId;

  admin: boolean = false;
  superviser: boolean = false;
  qc: boolean = false;

  MachineNotFounderror: boolean = false;
  QcMachineParameterNotSetError: boolean = false;


  qcokay: boolean = false;
  qcdataokay: boolean = false;

  shiftA1: boolean = false;
  shiftA2: boolean = false;
  shiftB1: boolean = false;
  shiftB2: boolean = false;

  shiftData: boolean = false;
  shiftData1: boolean = false;

  adminTwoDate: boolean = false;
  adminOneDate: boolean = false;

  SingleDate: FormGroup;
  TwoDate: FormGroup;

  lapformerpara: FormGroup;
  lapformerparameterAone: FormGroup;
  lapformerparameterAtwo: FormGroup;
  lapformerparameterBone: FormGroup;
  lapformerparameterBtwo: FormGroup;

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
      addLapFormer: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addLapFormer.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },

      deliveryspeed: {
        title: 'DELIVERY SPEED (MPM)',
        type: 'number',
      },
      lapWeight: {
        title: 'LAP WEIGHT (GM)',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      productiononratekgcard8perhour: {
        title: 'PRODUCTION / MC / 8 HOURS (KG)',
        type: 'number',
      },
      machineefficencykgcardpersixhours: {
        title: 'PRODUCTION / MC / 6 HOURS (KG)',
        type: 'number',
      },
      machineefficencykgcardperday: {
        title: 'PRODUCTION / MC / 24 HRS (KG)',
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
      addLapFormer: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addLapFormer.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },

      deliveryspeed: {
        title: 'DELIVERY SPEED (MPM)',
        type: 'number',
      },
      lapWeight: {
        title: 'LAP WEIGHT (GM)',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      productiononratekgcard8perhour: {
        title: 'PRODUCTION / MC / 8 HOURS (KG)',
        type: 'number',
      },
      machineefficencykgcardpersixhours: {
        title: 'PRODUCTION / MC / 6 HOURS (KG)',
        type: 'number',
      },
      machineefficencykgcardperday: {
        title: 'PRODUCTION / MC / 24 HRS (KG)',
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
      addLapFormer: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addLapFormer.name
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
  NbDialogRef: any;


  constructor(private post: MachineService,
    pipe: DecimalPipe,
    private _auth: LoginService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private lapformerAllPara: LapformerService,
    private MachinePara: MachineParameterService,
    protected dateService: NbDateService<Date>,
    private timeGet: TimeGetService,
    private dialogService: NbDialogService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

    this.lapformerpara = this.fb.group({
      lapformerparaData: this.fb.array([]),
    });
    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });
    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.lapformerparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.lapformerparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.lapformerparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.lapformerparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.post.ViewAllLapformer().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if (a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.LapformerGet.push(this.Lapformer(data[i]));
      }
    });


    this.MachinePara.DateSingleLapformer(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if (a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.LapformerParaAoneGet.push(this.LapformerParaAone(data.Data[i]));
        this.LapformerParaAtwoGet.push(this.LapformerParaAtwo(data.Data[i]));
        this.LapformerParaBoneGet.push(this.LapformerParaBone(data.Data[i]));
        this.LapformerParaBtwoGet.push(this.LapformerParaBtwo(data.Data[i]));

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
        this.name.push(data.Data[i].addLapFormer.name);
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
  }

  get LapformerGet() {
    return this.lapformerpara.get('lapformerparaData') as FormArray;
  }

  get LapformerParaAoneGet() {
    return this.lapformerparameterAone.get('parareading') as FormArray;
  }
  get LapformerParaAtwoGet() {
    return this.lapformerparameterAtwo.get('parareading') as FormArray;
  }
  get LapformerParaBoneGet() {
    return this.lapformerparameterBone.get('parareading') as FormArray;
  }
  get LapformerParaBtwoGet() {
    return this.lapformerparameterBtwo.get('parareading') as FormArray;
  }


  Lapformer(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      lapWeight: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      addLapFormer: [Data],
    });
  }
  LapformerParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  LapformerParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  LapformerParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  LapformerParaBtwo(cc: any) {
    return this.fb.group({
      shift_b_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }

  addParameter(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  NumberOnly(event) {
    if (event.key.length === 1 && ((event.which < 48 || event.which > 57) && (event.which < 96 || event.which > 105))) {
      event.preventDefault();
    }
  }

  onDateSingleSubmit() {
    let date = this.SingleDate.value.date;
    if (date != '') {
      this.MachinePara.DateSingleLapformer(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateLapformer(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
    this.MachinePara.DownloadSingleLapformer(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'LapFormer ' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadLapformer(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'LapFormer' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onComberSubmit() {
    this.lapformerpara.markAsDirty();
    let a = this.lapformerpara.value.lapformerparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddLapformerParameter(a[i]).subscribe((data: any) => {

        this.lapformerpara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onLapformerParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.lapformerparameterAone.value.parareading.length; i++) {
      let Mid = this.lapformerparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.lapformerparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.lapformerAllPara.LapformerParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.lapformerparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onLapformerParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.lapformerparameterAtwo.value.parareading.length; i++) {
      let Mid = this.lapformerparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.lapformerparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.lapformerAllPara.LapformerParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.lapformerparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onLapformerParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.lapformerparameterBone.value.parareading.length; i++) {
      let Mid = this.lapformerparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.lapformerparameterBone.value.parareading[i].shift_b_sixHoursOne }

      this.lapformerAllPara.LapformerParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.lapformerparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onLapformerParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.lapformerparameterBtwo.value.parareading.length; i++) {
      let Mid = this.lapformerparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.lapformerparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.lapformerAllPara.LapformerParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.lapformerparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

}
