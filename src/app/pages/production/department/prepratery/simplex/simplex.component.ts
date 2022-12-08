import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { MachineParameterService } from '../../../../../@service/machine-parameter/machine-parameter.service';
import { SimplaxService } from '../../../../../@service/machine-parameter/simplax/simplax.service';
import { MachineService } from '../../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-simplex',
  templateUrl: './simplex.component.html',
  styleUrls: ['./simplex.component.scss']
})
export class SimplexComponent implements OnInit {

  chart = [];
  name = [];
  reding0 = [];
  redingA = [];
  redingB = [];
  redingC = [];
  redingD = [];

  demo: any;
  simplex: any;
  private regex: RegExp = new RegExp('^[0-9]*$');

  time: any;
  todayDate: any;
  intervalId;

  admin: boolean = false;
  superviser: boolean = false;
  qc: boolean = false;

  qcokay: boolean = false;
  qcdataokay: boolean = false;

  MachineNotFounderror: boolean = false;
  QcMachineParameterNotSetError: boolean = false;

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

  simplexpara: FormGroup;
  simplexparameterAone: FormGroup;
  simplexparameterAtwo: FormGroup;
  simplexparameterBone: FormGroup;
  simplexparameterBtwo: FormGroup;

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
      simplex: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.simplex.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      speedRpm: {
        title: 'SPINDLE SPEED (RPM)',
        type: 'number',
      },
      machineEfficiency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      tm: {
        title: 'TM',
        type: 'number',
      },
      rovingHank: {
        title: 'ROVING HANK',
        type: 'number',
      },
      tpi: {
        title: 'TPI',
        type: 'number',
      },
      productionSpindle8hours: {
        title: 'PRODUCTION / SPINDLE /8 HOURS (KG)',
        type: 'number',
      },
      conversionTo12HoursSpindleShift: {
        title: 'CONVERSION TO 12 HRS / SPINDLE / SHIFT',
        type: 'number',
      },
      productionMachine200SpindlesMachineKgPer12Hours: {
        title: 'PRODUCTION / MACHINE @ 200 SPINDLES / MACHINE (KG)/12 Hrs',
        type: 'number',
      },
      productionSpindle8hoursHank: {
        title: 'PRODUCTION / SPINDLE / 8 HOURS (HANK)',
        type: 'number',
      },
      productionMachine200SpindlesMachineHankPer12Hours: {
        title: 'PRODUCTION / MACHINE @ 200 SPINDLES / MACHINE  (HANK )',
        type: 'number',
      },
      conversionTo12HoursSpindleShiftHank: {
        title: 'CONVERSION TO 12 HRS SHIFT (HANK)',
        type: 'number',
      },
      conversionTo6HoursSpindleShift: {
        title: 'CONVERSION TO 6 HRS / SPINDLE / SHIFT',
        type: 'number',
      },
      conversionTo6HoursMachineShiftKgs: {
        title: 'CONVERSION TO 6 HRS /MACHINE/ SHIFT (Kgs)',
        type: 'number',
      },
      conversionTo24HoursMachineShiftKgs: {
        title: 'CONVERSION TO 24 Hrs /MACHINE (Kgs)',
        type: 'number',
      },
      conversionTo24HoursMachineShiftHank: {
        title: 'CONVERSION TO 24 Hrs /MACHINE (Hank)',
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
      simplex: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.simplex.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      speedRpm: {
        title: 'SPINDLE SPEED (RPM)',
        type: 'number',
      },
      machineEfficiency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      tm: {
        title: 'TM',
        type: 'number',
      },
      rovingHank: {
        title: 'ROVING HANK',
        type: 'number',
      },
      tpi: {
        title: 'TPI',
        type: 'number',
      },
      productionSpindle8hours: {
        title: 'PRODUCTION / SPINDLE /8 HOURS (KG)',
        type: 'number',
      },
      conversionTo12HoursSpindleShift: {
        title: 'CONVERSION TO 12 HRS / SPINDLE / SHIFT',
        type: 'number',
      },
      productionMachine200SpindlesMachineKgPer12Hours: {
        title: 'PRODUCTION / MACHINE @ 200 SPINDLES / MACHINE (KG)/12 Hrs',
        type: 'number',
      },
      productionSpindle8hoursHank: {
        title: 'PRODUCTION / SPINDLE / 8 HOURS (HANK)',
        type: 'number',
      },
      productionMachine200SpindlesMachineHankPer12Hours: {
        title: 'PRODUCTION / MACHINE @ 200 SPINDLES / MACHINE  (HANK )',
        type: 'number',
      },
      conversionTo12HoursSpindleShiftHank: {
        title: 'CONVERSION TO 12 HRS SHIFT (HANK)',
        type: 'number',
      },
      conversionTo6HoursSpindleShift: {
        title: 'CONVERSION TO 6 HRS / SPINDLE / SHIFT',
        type: 'number',
      },
      conversionTo6HoursMachineShiftKgs: {
        title: 'CONVERSION TO 6 HRS /MACHINE/ SHIFT (Kgs)',
        type: 'number',
      },
      conversionTo24HoursMachineShiftKgs: {
        title: 'CONVERSION TO 24 Hrs /MACHINE (Kgs)',
        type: 'number',
      },
      conversionTo24HoursMachineShiftHank: {
        title: 'CONVERSION TO 24 Hrs /MACHINE (Hank)',
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
      simplex: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.simplex.name
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
    private simplexAllPara: SimplaxService,
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

    this.simplexpara = this.fb.group({
      simplexparaData: this.fb.array([]),
    });

    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });

    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.simplexparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.simplexparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.simplexparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.simplexparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.post.ViewAllSimplex().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if (a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.SimplexGet.push(this.Simplex(data[i]));
      }
    });

    this.MachinePara.DateSingleSimplex(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if (a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.SimplexParaAoneGet.push(this.SimplexParaAone(data.Data[i]));
        this.SimplexParaAtwoGet.push(this.SimplexParaAtwo(data.Data[i]));
        this.SimplexParaBoneGet.push(this.SimplexParaBone(data.Data[i]));
        this.SimplexParaBtwoGet.push(this.SimplexParaBtwo(data.Data[i]));

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
        this.name.push(data.Data[i].simplex.name);
        this.reding0.push(data.Data[i].conversionTo6HoursMachineShiftKgs);
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

  get SimplexGet() {
    return this.simplexpara.get('simplexparaData') as FormArray;
  }
  get SimplexParaAoneGet() {
    return this.simplexparameterAone.get('parareading') as FormArray;
  }
  get SimplexParaAtwoGet() {
    return this.simplexparameterAtwo.get('parareading') as FormArray;
  }
  get SimplexParaBoneGet() {
    return this.simplexparameterBone.get('parareading') as FormArray;
  }
  get SimplexParaBtwoGet() {
    return this.simplexparameterBtwo.get('parareading') as FormArray;
  }


  Simplex(Data: any) {
    return this.fb.group({
      speedRpm: ['', Validators.required],
      machineEfficiency: ['', Validators.required],
      tm: ['', Validators.required],
      rovingHank: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      simplex: [Data],
    });
  }
  SimplexParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  SimplexParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  SimplexParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  SimplexParaBtwo(cc: any) {
    return this.fb.group({
      shift_b_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }

  NumberOnly(event) {
    if (event.key.length === 1 && ((event.which < 48 || event.which > 57) && (event.which < 96 || event.which > 105))) {
      event.preventDefault();
    }
  }

  addParameter(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onDateSingleSubmit() {
    let date = this.SingleDate.value.date;
    if (date != '') {
      this.MachinePara.DateSingleSimplex(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateSimplax(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
    this.MachinePara.DownloadSingleSimplax(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Speed Frame ' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadSimplax(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Speed Frame' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onSimplexSubmit() {
    this.simplexpara.markAsDirty();
    let a = this.simplexpara.value.simplexparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddSimplexParameter(a[i]).subscribe((data: any) => {
        this.simplexpara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onSimplexParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.simplexparameterAone.value.parareading.length; i++) {
      let Mid = this.simplexparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.simplexparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.simplexAllPara.SimplexParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.simplexparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onSimplexParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.simplexparameterAtwo.value.parareading.length; i++) {
      let Mid = this.simplexparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.simplexparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.simplexAllPara.SimplexParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.simplexparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onSimplexParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.simplexparameterBone.value.parareading.length; i++) {
      let Mid = this.simplexparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.simplexparameterBone.value.parareading[i].shift_b_sixHoursOne }

      this.simplexAllPara.SimplexParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.simplexparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onSimplexParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.simplexparameterBtwo.value.parareading.length; i++) {
      let Mid = this.simplexparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.simplexparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.simplexAllPara.SimplexParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.simplexparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

}
