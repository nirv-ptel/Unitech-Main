import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { DrawframesService } from '../../../../../@service/machine-parameter/drawframes/drawframes.service';
import { MachineParameterService } from '../../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-drawframes',
  templateUrl: './drawframes.component.html',
  styleUrls: ['./drawframes.component.scss']
})
export class DrawframesComponent implements OnInit {

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
  drawframes: any;
  drawframes1: any;

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

  drawframespara: FormGroup;
  drawframesparaHank: FormGroup;

  drawframesparameterAone: FormGroup;
  drawframesparameterAtwo: FormGroup;
  drawframesparameterBone: FormGroup;
  drawframesparameterBtwo: FormGroup;
  drawframesparameterHankAone: FormGroup;
  drawframesparameterHankAtwo: FormGroup;
  drawframesparameterHankBone: FormGroup;
  drawframesparameterHankBtwo: FormGroup;

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
      drawFramesMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesMachine.name
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
      drawFramesPerHanks: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesPerHanks.name
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
      drawFramesMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesMachine.name
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
      drawFramesPerHanks: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesPerHanks.name
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
      drawFramesMachine: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesMachine.name
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
      drawFramesPerHanks: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.drawFramesPerHanks.name
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
    private drawframesAllPara: DrawframesService,
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

    this.drawframespara = this.fb.group({
      drawframesparaData: this.fb.array([]),
    });
    this.drawframesparaHank = this.fb.group({
      drawframesparaData: this.fb.array([]),
    });
    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });
    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

    this.drawframesparameterAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.drawframesparameterHankAone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterHankAtwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterHankBone = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.drawframesparameterHankBtwo = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.post.ViewAllDrawframes().subscribe(data => {
      this.demo = data;
      let a = this.demo.length;
      if(a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.DrawframesGet.push(this.Drawframes(data[i]));
        this.DrawframesGetHank.push(this.DrawframesHank(data[i]));
      }
    });

    this.MachinePara.DateSingleDrawframesKG(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.DrawframesParaAoneGet.push(this.DrawframesParaAone(data.Data[i]));
        this.DrawframesParaAtwoGet.push(this.DrawframesParaAtwo(data.Data[i]));
        this.DrawframesParaBoneGet.push(this.DrawframesParaBone(data.Data[i]));
        this.DrawframesParaBtwoGet.push(this.DrawframesParaBtwo(data.Data[i]));

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
        this.name.push(data.Data[i].drawFramesMachine.name);
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
    this.MachinePara.DateSingleDrawframesHANK(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source1 = data.Data;
      let a = data.Data.length;
      if(a <= 0) {
        this.QcMachineParameterNotSetError1 = true;
      }
      for (let i = 0; i < a; i++) {
        this.DrawframesHankParaAoneGet.push(this.DrawframesHankParaAone(data.Data[i]));
        this.DrawframesHankParaAtwoGet.push(this.DrawframesHankParaAtwo(data.Data[i]));
        this.DrawframesHankParaBoneGet.push(this.DrawframesHankParaBone(data.Data[i]));
        this.DrawframesHankParaBtwoGet.push(this.DrawframesHankParaBtwo(data.Data[i]));

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
        this.nameHank.push(data.Data[i].drawFramesPerHanks.name);
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

  get DrawframesGet() {
    return this.drawframespara.get('drawframesparaData') as FormArray;
  }
  get DrawframesGetHank() {
    return this.drawframesparaHank.get('drawframesparaData') as FormArray;
  }

  get DrawframesParaAoneGet() {
    return this.drawframesparameterAone.get('parareading') as FormArray;
  }
  get DrawframesParaAtwoGet() {
    return this.drawframesparameterAtwo.get('parareading') as FormArray;
  }
  get DrawframesParaBoneGet() {
    return this.drawframesparameterBone.get('parareading') as FormArray;
  }
  get DrawframesParaBtwoGet() {
    return this.drawframesparameterBtwo.get('parareading') as FormArray;
  }
  get DrawframesHankParaAoneGet() {
    return this.drawframesparameterHankAone.get('parareading') as FormArray;
  }
  get DrawframesHankParaAtwoGet() {
    return this.drawframesparameterHankAtwo.get('parareading') as FormArray;
  }
  get DrawframesHankParaBoneGet() {
    return this.drawframesparameterHankBone.get('parareading') as FormArray;
  }
  get DrawframesHankParaBtwoGet() {
    return this.drawframesparameterHankBtwo.get('parareading') as FormArray;
  }

  Drawframes(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      silverhank: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      drawFramesMachine: [Data],

    });
  }
  DrawframesHank(Data: any) {
    return this.fb.group({
      deliveryspeed: ['', Validators.required],
      machineefficency: ['', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      drawFramesPerHanks: [Data],
    });
  }
  DrawframesParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesParaBtwo(cc: any) {
    return this.fb.group({
      shift_b_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }

  DrawframesHankParaAone(cc: any) {
    return this.fb.group({
      shift_a_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesHankParaAtwo(cc: any) {
    return this.fb.group({
      shift_a_sixHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesHankParaBone(cc: any) {
    return this.fb.group({
      shift_b_sixHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  DrawframesHankParaBtwo(cc: any) {
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
      this.MachinePara.DateSingleDrawframesKG(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
        this.source2 = data.Data;
        if (data.Data.length > 0) {
          this.adminOneDate = true;
        } else {
          this.adminOneDate = false;
        }
      })
      this.MachinePara.DateSingleDrawframesHANK(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateDrawframeKG(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateDrawframeHANK(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
    this.MachinePara.DownloadSingleDrawframeKG(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'DrawframeKG' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadDrawframeKG(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'DrawframeKG' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  downloadSingleHank() {
    let start = this.SingleDate.value.date;
    this.MachinePara.DownloadSingleDrawframeHANK(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'DrawframeHANK' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  downloadHank() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadDrawframeHANK(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'DrawframeHANK' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onDrawframesKgSubmit() {
    this.drawframespara.markAsDirty();
    let a = this.drawframespara.value.drawframesparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddDrawframesParameter(a[i]).subscribe((data: any) => {
        this.drawframespara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }
  onDrawframesHankSubmit() {
    this.drawframesparaHank.markAsDirty();
    let a = this.drawframesparaHank.value.drawframesparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddDrawframesHankParameter(a[i]).subscribe((data: any) => {
        this.drawframesparaHank.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onDrawframesParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterAone.value.parareading.length; i++) {
      let Mid = this.drawframesparameterAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.drawframesparameterAone.value.parareading[i].shift_a_sixHoursOne }
      this.drawframesAllPara.DrawframesParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterAone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterAtwo.value.parareading.length; i++) {
      let Mid = this.drawframesparameterAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.drawframesparameterAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.drawframesAllPara.DrawframesParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterAtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterBone.value.parareading.length; i++) {
      let Mid = this.drawframesparameterBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.drawframesparameterBone.value.parareading[i].shift_b_sixHoursOne }

      this.drawframesAllPara.DrawframesParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterBone.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterBtwo.value.parareading.length; i++) {
      let Mid = this.drawframesparameterBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.drawframesparameterBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.drawframesAllPara.DrawframesParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterBtwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterAoneHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterHankAone.value.parareading.length; i++) {
      let Mid = this.drawframesparameterHankAone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursOne': this.drawframesparameterHankAone.value.parareading[i].shift_a_sixHoursOne }
      this.drawframesAllPara.DrawframesParameterHankShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterHankAone.value.parareading.length) {
          this.NbDialogRef1.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterAtwoHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterHankAtwo.value.parareading.length; i++) {
      let Mid = this.drawframesparameterHankAtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_sixHoursTwo': this.drawframesparameterHankAtwo.value.parareading[i].shift_a_sixHoursTwo }

      this.drawframesAllPara.DrawframesParameterHankShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterHankAtwo.value.parareading.length) {
          this.NbDialogRef1.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterBoneHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterHankBone.value.parareading.length; i++) {
      let Mid = this.drawframesparameterHankBone.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursOne': this.drawframesparameterHankBone.value.parareading[i].shift_b_sixHoursOne }

      this.drawframesAllPara.DrawframesParameterHankShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterHankBone.value.parareading.length) {
          this.NbDialogRef1.close();
          location.reload();
        }
      });
    }
  }

  onDrawframesParameterBtwoHankSubmit() {
    let check = 1;
    for (let i = 0; i < this.drawframesparameterHankBtwo.value.parareading.length; i++) {
      let Mid = this.drawframesparameterHankBtwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_sixHoursTwo': this.drawframesparameterHankBtwo.value.parareading[i].shift_b_sixHoursTwo }

      this.drawframesAllPara.DrawframesParameterHankShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.drawframesparameterHankBtwo.value.parareading.length) {
          this.NbDialogRef1.close();
          location.reload();
        }
      });
    }
  }
  // demodd(event: any) {
  //   let Mid = event.value.description.machineId;
  //   let Paravalue;
  //   if(this.shiftA1) {
  //     Paravalue = {'shift_a_sixHoursOne':event.value.shift_a_sixHoursOne}
  //     this.drawframesAllPara.DrawframesParameterShiftAOne(Mid,Paravalue).subscribe((data: any) => {
  //       alert('A1 paraset');
  //     });
  //   } else if(this.shiftA2) {
  //     Paravalue = {'shift_a_sixHoursTwo':event.value.shift_a_sixHoursTwo}
  //     this.drawframesAllPara.DrawframesParameterShiftATwo(Mid,Paravalue).subscribe((data: any) => {
  //       alert('A2 paraset');
  //     });
  //   } else if(this.shiftB1) {
  //     Paravalue = {'shift_b_sixHoursOne':event.value.shift_b_sixHoursOne}
  //     this.drawframesAllPara.DrawframesParameterShiftBOne(Mid,Paravalue).subscribe((data: any) => {
  //       alert('B1 paraset');
  //     });
  //   } else if(this.shiftB2) {
  //     Paravalue = {'shift_b_sixHoursTwo':event.value.shift_b_sixHoursTwo}
  //     this.drawframesAllPara.DrawframesParameterShiftBTwo(Mid,Paravalue).subscribe((data: any) => {
  //       alert('B2 paraset');
  //     });
  //   }
  //   this.ngOnInit();
  // }
  // demodd1(event: any) {
  //   let Mid = event.value.description.machineId;
  //   let Paravalue;
  //   if(this.shiftA1) {
  //     Paravalue = {'shift_a_sixHoursOne':event.value.shift_a_sixHoursOne}
  //     this.drawframesAllPara.DrawframesParameterHankShiftAOne(Mid,Paravalue).subscribe((data: any) => {
  //       alert('A1 paraset');
  //     });
  //   } else if(this.shiftA2) {
  //     Paravalue = {'shift_a_sixHoursTwo':event.value.shift_a_sixHoursTwo}
  //     this.drawframesAllPara.DrawframesParameterHankShiftATwo(Mid,Paravalue).subscribe((data: any) => {
  //       alert('A2 paraset');
  //     });
  //   } else if(this.shiftB1) {
  //     Paravalue = {'shift_b_sixHoursOne':event.value.shift_b_sixHoursOne}
  //     this.drawframesAllPara.DrawframesParameterHankShiftBOne(Mid,Paravalue).subscribe((data: any) => {
  //       alert('B1 paraset');
  //     });
  //   } else if(this.shiftB2) {
  //     Paravalue = {'shift_b_sixHoursTwo':event.value.shift_b_sixHoursTwo}
  //     this.drawframesAllPara.DrawframesParameterHankShiftBTwo(Mid,Paravalue).subscribe((data: any) => {
  //       alert('B2 paraset');
  //     });
  //   }
  //   this.ngOnInit();
  // }

}
