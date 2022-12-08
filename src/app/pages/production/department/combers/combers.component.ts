import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../@service/auth/login.service';
import { ComberService } from '../../../../@service/machine-parameter/comber/comber.service';
import { MachineParameterService } from '../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-combers',
  templateUrl: './combers.component.html',
  styleUrls: ['./combers.component.scss']
})
export class CombersComponent implements OnInit {

  chart = [];
  name = [];
  reding0 = [];
  redingA = [];
  redingB = [];
  redingC = [];
  redingD = [];

  demo: any;
  comber: any;
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

  comberpara: FormGroup;
  comberparameterAone: FormGroup;
  comberparameterAtwo: FormGroup;
  comberparameterBone: FormGroup;
  comberparameterBtwo: FormGroup;

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
      addcomber: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addcomber.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },

      comberSpeedRpm: {
        title: 'COMBER SPEED(NPM)',
        type: 'number',
      },
      feedNip: {
        title: 'FEED/NIP (MM)',
        type: 'number',
      },
      lapWeight: {
        title: 'LAP WEIGHT (GM)',
        type: 'number',
      },
      machineEfficency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      noil: {
        title: 'NOIL %',
        type: 'number',
      },
      productioMc8Hour: {
        title: 'PRODUCTION / MC / 8 HOURS (KG)',
        type: 'number',
      },
      productioMc6Hour: {
        title: 'PRODUCTION / MC / 6 HOURS (KG)',
        type: 'number',
      },
      productioShift: {
        title: 'PRODUCTION / MC / SHIFT (KG)',
        type: 'number',
      },
      productioMc24Hour: {
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
      addcomber: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addcomber.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },

      comberSpeedRpm: {
        title: 'COMBER SPEED(NPM)',
        type: 'number',
      },
      feedNip: {
        title: 'FEED/NIP (MM)',
        type: 'number',
      },
      lapWeight: {
        title: 'LAP WEIGHT (GM)',
        type: 'number',
      },
      machineEfficency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      noil: {
        title: 'NOIL %',
        type: 'number',
      },
      productioMc8Hour: {
        title: 'PRODUCTION / MC / 8 HOURS (KG)',
        type: 'number',
      },
      productioMc6Hour: {
        title: 'PRODUCTION / MC / 6 HOURS (KG)',
        type: 'number',
      },
      productioShift: {
        title: 'PRODUCTION / MC / SHIFT (KG)',
        type: 'number',
      },
      productioMc24Hour: {
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
      addcomber: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.addcomber.name
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
    private comberAllPara: ComberService,
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

    this.comberpara = this.fb.group({
      comberparaData: this.fb.array([]),
    });

    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });
    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.comberparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.comberparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.comberparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.comberparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });


    this.post.ViewAllCombers().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if(a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.ComberGet.push(this.Comber(data[i]));
      }
    });

    this.MachinePara.DateSingleComber(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.ComberParaAoneGet.push(this.ComberParaAone(data.Data[i]));
        this.ComberParaAtwoGet.push(this.ComberParaAtwo(data.Data[i]));
        this.ComberParaBoneGet.push(this.ComberParaBone(data.Data[i]));
        this.ComberParaBtwoGet.push(this.ComberParaBtwo(data.Data[i]));

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
        this.name.push(data.Data[i].addcomber.name);
        this.reding0.push(data.Data[i].productioMc6Hour);
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
  get ComberGet() {
    return this.comberpara.get('comberparaData') as FormArray;
  }

  get ComberParaAoneGet() {
    return this.comberparameterAone.get('parareading') as FormArray;
  }
  get ComberParaAtwoGet() {
    return this.comberparameterAtwo.get('parareading') as FormArray;
  }
  get ComberParaBoneGet() {
    return this.comberparameterBone.get('parareading') as FormArray;
  }
  get ComberParaBtwoGet() {
    return this.comberparameterBtwo.get('parareading') as FormArray;
  }


  Comber(Data: any) {
    return this.fb.group({
      comberSpeedRpm: ['', Validators.required],
      feedNip: ['', Validators.required],
      lapWeight: ['', Validators.required],
      machineEfficency: ['', Validators.required],
      noil: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      addcomber: [Data],
    });
  }
  ComberParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  ComberParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  ComberParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  ComberParaBtwo(cc: any) {
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
      this.MachinePara.DateSingleComber(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateComber(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
    this.MachinePara.DownloadSingleComber(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Comber' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadComber(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Comber' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onComberSubmit() {
    this.comberpara.markAsDirty();
    let a = this.comberpara.value.comberparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddComberParameter(a[i]).subscribe((data: any) => {

        this.comberpara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onComberParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.comberparameterAone.value.parareading.length; i++) {
      let Mid = this.comberparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.comberparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.comberAllPara.ComberParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.comberparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }

  }

  onComberParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.comberparameterAtwo.value.parareading.length; i++) {
      let Mid = this.comberparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.comberparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.comberAllPara.ComberParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.comberparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onComberParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.comberparameterBone.value.parareading.length; i++) {
      let Mid = this.comberparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.comberparameterBone.value.parareading[i].shift_b_sixHoursOne }

      this.comberAllPara.ComberParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.comberparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onComberParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.comberparameterBtwo.value.parareading.length; i++) {
      let Mid = this.comberparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.comberparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.comberAllPara.ComberParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.comberparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

}
