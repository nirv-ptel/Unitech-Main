import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { FinisherService } from '../../../../../@service/machine-parameter/finisher/finisher.service';
import { MachineParameterService } from '../../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-finisher',
  templateUrl: './finisher.component.html',
  styleUrls: ['./finisher.component.scss']
})
export class FinisherComponent implements OnInit {

  chart = [];
  name = [];
  reding0 = [];
  redingA = [];
  redingB = [];
  redingC = [];
  redingD = [];

  nameHank = [];
  redingHank0 = [];
  redingHankA = [];
  redingHankB = [];
  redingHankC = [];
  redingHankD = [];

  demo: any;
  finisher: any;
  finisher1: any;

  private regex: RegExp = new RegExp('^[0-9]*$');

  time: any;
  todayDate: any;
  intervalId;

  admin: boolean = false;
  superviser: boolean = false;
  qc: boolean = false;

  MachineNotFounderror: boolean = false;
  QcMachineParameterNotSetError: boolean = false;
  QcMachineParameterNotSetError1: boolean = false;

  qcKg: boolean = false;
  qcdataKg: boolean = false;
  qcHank: boolean = false;
  qcdataHank: boolean = false;

  shiftA1: boolean = false;
  shiftA2: boolean = false;
  shiftB1: boolean = false;
  shiftB2: boolean = false;

  shiftData: boolean = false;
  shiftDataA: boolean = false;
  shiftData1: boolean = false;
  shiftDataA1: boolean = false;

  adminTwoDate: boolean = false;
  adminOneDate: boolean = false;
  adminTwoDate1: boolean = false;
  adminOneDate1: boolean = false;

  SingleDate: FormGroup;
  TwoDate: FormGroup;

  finisherpara: FormGroup;
  finisherparaHank: FormGroup;
  finisherparameterAone: FormGroup;
  finisherparameterAtwo: FormGroup;
  finisherparameterBone: FormGroup;
  finisherparameterBtwo: FormGroup;
  finisherparameterHankAone: FormGroup;
  finisherparameterHankAtwo: FormGroup;
  finisherparameterHankBone: FormGroup;
  finisherparameterHankBtwo: FormGroup;

  source: any = [];
  source1: any = [];
  source2: any = [];
  source3: any = [];
  source4: any = [];
  source5: any = [];

  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      finisherMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherMachine.name
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
      silverhank: {
        title: 'SILVER HANK',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      productiononratekgdfper8hour: {
        title: 'PRODUCTION RATE +(KG/DF/DELIVERY/8 HOUR)',
        type: 'number',
      },
      machineefficencykgdfper6hours: {
        title: 'PRODUCTION RATE (KG/DF/6 HOUR)',
        type: 'number',
      },
      machineefficencykgdfperday: {
        title: 'PRODUCTION RATE (KG/DF/24 HOUR)',
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
      finisherhankMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherhankMachine.name
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

      machineefficency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      productiononratekgdfper8hour: {
        title: 'PRODUCTION RATE +(KG/DF/DELIVERY/8 HOUR)',
        type: 'number',
      },
      machineefficencykgdfper6hours: {
        title: 'PRODUCTION RATE (KG/DF/6 HOUR)',
        type: 'number',
      },
      machineefficencykgdfperday: {
        title: 'PRODUCTION RATE (KG/DF/24 HOUR)',
        type: 'number',
      },
    },
  };
  settings2 = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      finisherMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherMachine.name
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
      silverhank: {
        title: 'SILVER HANK',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      productiononratekgdfper8hour: {
        title: 'PRODUCTION RATE +(KG/DF/DELIVERY/8 HOUR)',
        type: 'number',
      },
      machineefficencykgdfper6hours: {
        title: 'PRODUCTION RATE (KG/DF/6 HOUR)',
        type: 'number',
      },
      machineefficencykgdfperday: {
        title: 'PRODUCTION RATE (KG/DF/24 HOUR)',
        type: 'number',
      },
    },
  };
  settings3 = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      finisherhankMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherhankMachine.name
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

      machineefficency: {
        title: 'MACHINE EFFICENCY %',
        type: 'number',
      },
      productiononratekgdfper8hour: {
        title: 'PRODUCTION RATE +(KG/DF/DELIVERY/8 HOUR)',
        type: 'number',
      },
      machineefficencykgdfper6hours: {
        title: 'PRODUCTION RATE (KG/DF/6 HOUR)',
        type: 'number',
      },
      machineefficencykgdfperday: {
        title: 'PRODUCTION RATE (KG/DF/24 HOUR)',
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
      finisherMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherMachine.name
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
  superviserViewDataHank = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      finisherhankMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.finisherhankMachine.name
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
  NbDialogRef1: any;

  constructor(private post: MachineService,
    pipe: DecimalPipe,
    private _auth: LoginService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private finisherAllPara: FinisherService,
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

    this.finisherpara = this.fb.group({
      finisherparaData: this.fb.array([]),
    });
    this.finisherparaHank = this.fb.group({
      finisherparaData: this.fb.array([]),
    });
    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });
    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.finisherparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.finisherparameterHankAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterHankAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterHankBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.finisherparameterHankBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });


    this.post.ViewAllFinisher().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if(a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.FinisherGet.push(this.Finisher(data[i]));
        this.FinisherGetHank.push(this.FinisherHank(data[i]));
      }
    });
    this.MachinePara.DateSingleFinisherKG(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.FinisherParaAoneGet.push(this.FinisherParaAone(data.Data[i]));
        this.FinisherParaAtwoGet.push(this.FinisherParaAtwo(data.Data[i]));
        this.FinisherParaBoneGet.push(this.FinisherParaBone(data.Data[i]));
        this.FinisherParaBtwoGet.push(this.FinisherParaBtwo(data.Data[i]));

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
        this.name.push(data.Data[i].finisherMachine.name);
        this.reding0.push(data.Data[i].machineefficencykgdfper6hours);
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
        this.qcKg = true;
        this.qcdataKg = false;
      } else {
        this.qcdataKg = true;
        this.qcKg = false;
      }
    })
    this.MachinePara.DateSingleFinisherHANK(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source1 = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError1 = true;
      }
      for (let i = 0; i < a; i++) {
        this.FinisherHankParaAoneGet.push(this.FinisherHankParaAone(data.Data[i]));
        this.FinisherHankParaAtwoGet.push(this.FinisherHankParaAtwo(data.Data[i]));
        this.FinisherHankParaBoneGet.push(this.FinisherHankParaBone(data.Data[i]));
        this.FinisherHankParaBtwoGet.push(this.FinisherHankParaBtwo(data.Data[i]));

        if (data.Data[i].shift_a_sixHoursOne == 0 && this.shiftA1) {
          this.shiftDataA = true;
        }
        if (data.Data[i].shift_a_sixHoursTwo == 0 && this.shiftA2) {
          this.shiftDataA = true;
        }
        if (data.Data[i].shift_b_sixHoursOne == 0 && this.shiftB1) {
          this.shiftDataA1 = true;
        }
        if (data.Data[i].shift_b_sixHoursTwo == 0 && this.shiftB2) {
          this.shiftDataA1 = true;
        }
        this.nameHank.push(data.Data[i].finisherhankMachine.name);
        this.redingHank0.push(data.Data[i].machineefficencykgdfper6hours);
        this.redingHankA.push(data.Data[i].shift_a_sixHoursOne);
        this.redingHankB.push(data.Data[i].shift_a_sixHoursTwo);
        this.redingHankC.push(data.Data[i].shift_b_sixHoursOne);
        this.redingHankD.push(data.Data[i].shift_b_sixHoursTwo);
      }

      if (this.admin && !this.MachineNotFounderror) {
        this.chart = new Chart('canvas1', {
          type: 'bar',
          data: {
            labels: this.nameHank,
            datasets: [
              {
                label: 'QC set',
                data: this.redingHank0,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift A1',
                data: this.redingHankA,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgb(54, 162, 235, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift A2',
                data: this.redingHankB,
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(255, 205, 86, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift B1',
                data: this.redingHankC,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgb(153, 102, 255, 0.5)',
                borderWidth: 1,
                borderRadius: 5,
                borderSkipped: false,
              },
              {
                label: 'Shift B2',
                data: this.redingHankD,
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
        this.qcHank = true;
        this.qcdataHank = false;
      } else {
        this.qcdataHank = true;
        this.qcHank = false;
      }
    })
  }

  get FinisherGet() {
    return this.finisherpara.get('finisherparaData') as FormArray;
  }
  get FinisherGetHank() {
    return this.finisherparaHank.get('finisherparaData') as FormArray;
  }

  get FinisherParaAoneGet() {
    return this.finisherparameterAone.get('parareading') as FormArray;
  }
  get FinisherParaAtwoGet() {
    return this.finisherparameterAtwo.get('parareading') as FormArray;
  }
  get FinisherParaBoneGet() {
    return this.finisherparameterBone.get('parareading') as FormArray;
  }
  get FinisherParaBtwoGet() {
    return this.finisherparameterBtwo.get('parareading') as FormArray;
  }
  get FinisherHankParaAoneGet() {
    return this.finisherparameterHankAone.get('parareading') as FormArray;
  }
  get FinisherHankParaAtwoGet() {
    return this.finisherparameterHankAtwo.get('parareading') as FormArray;
  }
  get FinisherHankParaBoneGet() {
    return this.finisherparameterHankBone.get('parareading') as FormArray;
  }
  get FinisherHankParaBtwoGet() {
    return this.finisherparameterHankBtwo.get('parareading') as FormArray;
  }

  Finisher(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      silverhank: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      finisherMachine: [Data],
    });
  }
  FinisherHank(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      finisherhankMachine: [Data],
    });
  }
  FinisherParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherParaBtwo(cc: any) {
    return this.fb.group({
      shift_b_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }

  FinisherHankParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherHankParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherHankParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  FinisherHankParaBtwo(cc: any) {
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

  addParameterKg(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }
  addParameterHank(dialog1: TemplateRef<any>) {
    this.NbDialogRef1 = this.dialogService.open(
      dialog1,
      {
        closeOnBackdropClick: false,
      });
  }

  onDateSingleSubmit() {
    let date = this.SingleDate.value.date;
    if (date != '') {
      this.MachinePara.DateSingleFinisherKG(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
        this.source2 = data.Data;
        if (data.Data.length > 0) {
          this.adminOneDate = true;
        } else {
          this.adminOneDate = false;
        }
      })
      this.MachinePara.DateSingleFinisherHANK(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
        this.source4 = data.Data;
        if (data.Data.length > 0) {
          this.adminOneDate1 = true;
        } else {
          this.adminOneDate1 = false;
        }
      })
    }
  }
  onDateSubmit() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    if (start != '' && end != '') {
      this.MachinePara.DateFinisherKG(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
        this.source3 = data.Data;
        this.adminTwoDate = true;
        if (data.Data.length > 0) {
          this.adminTwoDate = true;
        } else {
          this.adminTwoDate = false;
        }
      }, (Error: any) => {
        alert("Date Invalid");
        this.adminTwoDate = false;
      });
      this.MachinePara.DateFinisherHANK(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
        this.source5 = data.Data;
        this.adminTwoDate1 = true;
        if (data.Data.length > 0) {
          this.adminTwoDate1 = true;
        } else {
          this.adminTwoDate1 = false;
        }
      }, (Error: any) => {
        alert("Date Invalid");
        this.adminTwoDate1 = false;
      })
    }
  }

  downloadSingle() {
    let start = this.SingleDate.value.date;
    this.MachinePara.DownloadSingleFinisherKG(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'FinisherKG' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadFinisherKG(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'FinisherKG' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  downloadSingleHank() {
    let start = this.SingleDate.value.date;
    this.MachinePara.DownloadSingleFinisherHANK(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'FinisherHANK' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  downloadHank() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadFinisherHANK(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'FinisherHANK' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onFinisherKgSubmit() {
    this.finisherpara.markAsDirty();
    let a = this.finisherpara.value.finisherparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddFinisherParameter(a[i]).subscribe((data: any) => {
        this.finisherpara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onFinisherHankSubmit() {
    this.finisherparaHank.markAsDirty();
    let a = this.finisherparaHank.value.finisherparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddFinisherHankParameter(a[i]).subscribe((data: any) => {
        this.finisherparaHank.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onFinisherParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterAone.value.parareading.length; i++) {
      let Mid = this.finisherparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.finisherparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.finisherAllPara.FinisherParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterAtwo.value.parareading.length; i++) {
      let Mid = this.finisherparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.finisherparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.finisherAllPara.FinisherParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterBone.value.parareading.length; i++) {
      let Mid = this.finisherparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.finisherparameterBone.value.parareading[i].shift_b_sixHoursOne }

      this.finisherAllPara.FinisherParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterBtwo.value.parareading.length; i++) {
      let Mid = this.finisherparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.finisherparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.finisherAllPara.FinisherParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterAoneHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterHankAone.value.parareading.length; i++) {
      let Mid = this.finisherparameterHankAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.finisherparameterHankAone.value.parareading[i].shift_a_sixHoursOne }
      this.finisherAllPara.FinisherParameterHankShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterHankAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterAtwoHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterHankAtwo.value.parareading.length; i++) {
      let Mid = this.finisherparameterHankAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.finisherparameterHankAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.finisherAllPara.FinisherParameterHankShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterHankAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterBoneHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterHankBone.value.parareading.length; i++) {
      let Mid = this.finisherparameterHankBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.finisherparameterHankBone.value.parareading[i].shift_b_sixHoursOne }

      this.finisherAllPara.FinisherParameterHankShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterHankBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onFinisherParameterBtwoHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.finisherparameterHankBtwo.value.parareading.length; i++) {
      let Mid = this.finisherparameterHankBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.finisherparameterHankBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.finisherAllPara.FinisherParameterHankShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.finisherparameterHankBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

}
