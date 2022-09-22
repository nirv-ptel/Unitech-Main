import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { LoginService } from '../../../../@service/auth/login.service';
import { MachineParameterService } from '../../../../@service/machine-parameter/machine-parameter.service';
import { RingframeService } from '../../../../@service/machine-parameter/ringframe/ringframe.service';
import { MachineService } from '../../../../@service/machine/machine.service';
import * as fileSaver from 'file-saver';
import * as Chart from 'chart.js';
import { TimeGetService } from '../../../../@service/timeGet/time-get.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-ringframe',
  templateUrl: './ringframe.component.html',
  styleUrls: ['./ringframe.component.scss']
})
export class RingframeComponent implements OnInit {


  chart: any;
  name = [];
  reding0 = [];

  redingA1 = [];
  redingA2 = [];
  redingA3 = [];
  redingA4 = [];
  redingA5 = [];
  redingA6 = [];
  redingB1 = [];
  redingB2 = [];
  redingB3 = [];
  redingB4 = [];
  redingB5 = [];
  redingB6 = [];
  datasets1 = [
    {
      label: 'QC ',
      data: this.reding0,
      backgroundColor: '#36a2eb',
      fill: true,
      stack: 'Stack 0',
    },
    {
      label: '10 AM',
      data: this.redingA1,
      backgroundColor: '#22cfcf',
      stack: 'Stack 1',
    },
    {
      label: '12 PM',
      data: this.redingA2,
      backgroundColor: '#ff6384',
      stack: 'Stack 1',
    },
    {
      label: '2 PM',
      data: this.redingA3,
      backgroundColor: '#fd5d00',
      stack: 'Stack 1',
    },
    {
      label: '4 PM',
      data: this.redingA4,
      backgroundColor: '#f1aa00',
      stack: 'Stack 1',
    },
    {
      label: '6 PM',
      data: this.redingA5,
      backgroundColor: '#1aa91f',
      stack: 'Stack 1',
    },
    {
      label: '8 PM',
      data: this.redingA6,
      backgroundColor: '#707378',
      stack: 'Stack 1',
    },
    {
      label: '10 PM',
      data: this.redingB1,
      backgroundColor: '#22cfcf',
      stack: 'Stack 2',
    },
    {
      label: '12 AM',
      data: this.redingB2,
      backgroundColor: '#ff6384',
      stack: 'Stack 2',
    },
    {
      label: '2 AM',
      data: this.redingB3,
      backgroundColor: '#fd5d00',
      stack: 'Stack 2',
    },
    {
      label: '4 AM',
      data: this.redingB4,
      backgroundColor: '#f1aa00',
      stack: 'Stack 2',
    },
    {
      label: '6 AM',
      data: this.redingB5,
      backgroundColor: '#1aa91f',
      stack: 'Stack 2',
    },
    {
      label: '8 AM',
      data: this.redingB6,
      backgroundColor: '#707378',
      stack: 'Stack 2',
    },
    
  ];

  demo: any;
  ringframe: any;
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
  shiftA3: boolean = false;
  shiftA4: boolean = false;
  shiftA5: boolean = false;
  shiftA6: boolean = false;
  shiftB1: boolean = false;
  shiftB2: boolean = false;
  shiftB3: boolean = false;
  shiftB4: boolean = false;
  shiftB5: boolean = false;
  shiftB6: boolean = false;

  shiftData: boolean = false;
  shiftData1: boolean = false;

  adminTwoDate: boolean = false;
  adminOneDate: boolean = false;

  SingleDate: FormGroup;
  TwoDate: FormGroup;
  SingleDatechart: FormGroup;

  ringframepara: FormGroup;
  ringframeparameterAOne: FormGroup;
  ringframeparameterATwo: FormGroup;
  ringframeparameterAThree: FormGroup;
  ringframeparameterAFour: FormGroup;
  ringframeparameterAFive: FormGroup;
  ringframeparameterASix: FormGroup;
  ringframeparameterBOne: FormGroup;
  ringframeparameterBTwo: FormGroup;
  ringframeparameterBThree: FormGroup;
  ringframeparameterBFour: FormGroup;
  ringframeparameterBFive: FormGroup;
  ringframeparameterBSix: FormGroup;

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
      ringframe: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.ringframe.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      spindleRpm: {
        title: 'SPINDLE SPEED',
        type: 'number',
      },
      type: {
        title: 'TYPE',
        type: 'string',
      },
      ringFrameCount: {
        title: 'COUNT',
        type: 'number',
      },
      tm: {
        title: 'TM',
        type: 'number',
      },
      tpi: {
        title: 'TPI',
        type: 'number',
      },
      machineEfficiency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      productionSpindleGrams: {
        title: 'PRODUCTION / SPINDLE (GRAMS)',
        type: 'number',
      },
      productionSpindle8HoursKg: {
        title: 'PRODUCTION / SPINDLE / 8 HOURS (KG)',
        type: 'number',
      },
      productionSpindle24HoursKg: {
        title: 'PRODUCTION / MACHINE/ 24 Hrs (KG)',
        type: 'number',
      },
      productionSpindle2HoursKg: {
        title: 'PRODUCTION / MACHINE/ 2 Hrs (KG)',
        type: 'number',
      },
      pneumafilWaste: {
        title: 'PNEUMAFIL WASTE %',
        type: 'number',
      },
      idleSpindle: {
        title: 'IDLE  SPINDLE %',
        type: 'number',
      },
      doffingLoss: {
        title: 'DOFFING LOSS %',
        type: 'number',
      },
      totalLoss: {
        title: 'TOTAL LOSS %',
        type: 'number',
      },
      totalLossKg: {
        title: 'TOTAL LOSS KG',
        type: 'number',
      },
      netProduction: {
        title: 'NET PRODUCTION',
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
      ringframe: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.ringframe.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      spindleRpm: {
        title: 'SPINDLE SPEED',
        type: 'number',
      },
      type: {
        title: 'TYPE',
        type: 'string',
      },
      ringFrameCount: {
        title: 'COUNT',
        type: 'number',
      },
      tm: {
        title: 'TM',
        type: 'number',
      },
      tpi: {
        title: 'TPI',
        type: 'number',
      },
      machineEfficiency: {
        title: 'MACHINE EFFICIENCY %',
        type: 'number',
      },
      productionSpindleGrams: {
        title: 'PRODUCTION / SPINDLE (GRAMS)',
        type: 'number',
      },
      productionSpindle8HoursKg: {
        title: 'PRODUCTION / SPINDLE / 8 HOURS (KG)',
        type: 'number',
      },
      productionSpindle24HoursKg: {
        title: 'PRODUCTION / MACHINE/ 24 Hrs (KG)',
        type: 'number',
      },
      productionSpindle2HoursKg: {
        title: 'PRODUCTION / MACHINE/ 2 Hrs (KG)',
        type: 'number',
      },
      pneumafilWaste: {
        title: 'PNEUMAFIL WASTE %',
        type: 'number',
      },
      idleSpindle: {
        title: 'IDLE  SPINDLE %',
        type: 'number',
      },
      doffingLoss: {
        title: 'DOFFING LOSS %',
        type: 'number',
      },
      totalLoss: {
        title: 'TOTAL LOSS %',
        type: 'number',
      },
      totalLossKg: {
        title: 'TOTAL LOSS KG',
        type: 'number',
      },
      netProduction: {
        title: 'NET PRODUCTION',
        type: 'number',
      },
      shift_a_twoHoursOne: {
        title: '8:00AM To 10:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankOne: {
        title: '8:00AM To 10:00AM (KG)',
        type: 'number',
      },
      shift_a_twoHoursTwo: {
        title: '10:00AM To 12:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankTwo: {
        title: '10:00AM To 12:00PM (KG)',
        type: 'number',
      },
      shift_a_twoHoursThree: {
        title: '12:00PM To 2:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankThree: {
        title: '12:00PM To 2:00PM (KG)',
        type: 'number',
      },
      shift_a_twoHoursFour: {
        title: '2:00PM To 4:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankFour: {
        title: '2:00PM To 4:00PM (KG)',
        type: 'number',
      },
      shift_a_twoHoursFive: {
        title: '4:00PM To 6:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankFive: {
        title: '4:00PM To 6:00PM (KG)',
        type: 'number',
      },
      shift_a_twoHoursSix: {
        title: '6:00PM To 8:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankSix: {
        title: '6:00PM To 8:00PM (KG)',
        type: 'number',
      },

      shift_b_twoHoursOne: {
        title: '8:00PM To 10:00PM (Hank)',
        type: 'number',
      },
      averageshift_a_HankSeven: {
        title: '8:00PM To 10:00PM (KG)',
        type: 'number',
      },
      shift_b_twoHoursTwo: {
        title: '10:00PM To 12:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankEight: {
        title: '10:00PM To 12:00AM (KG)',
        type: 'number',
      },
      shift_b_twoHoursThree: {
        title: '12:00AM To 2:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankNine: {
        title: '12:00AM To 2:00AM (KG)',
        type: 'number',
      },
      shift_b_twoHoursFour: {
        title: '2:00AM To 4:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankTen: {
        title: '2:00AM To 4:00AM (KG)',
        type: 'number',
      },
      shift_b_twoHoursFive: {
        title: '4:00AM To 6:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankEleven: {
        title: '4:00AM To 6:00AM (KG)',
        type: 'number',
      },
      shift_b_twoHoursSix: {
        title: '6:00AM To 8:00AM (Hank)',
        type: 'number',
      },
      averageshift_a_HankTwelev: {
        title: '6:00AM To 8:00AM (KG)',
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
      ringframe: {
        title: 'Machine Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.ringframe.name
        },
        filterFunction(cell: any, search?: string): boolean {
          if (cell.name.indexOf(search) > -1) {
            return true;
          }
        }
      },
      shift_a_twoHoursOne: {
        title: 'Shift A One',
        type: 'number',
      },
      shift_a_twoHoursTwo: {
        title: 'Shift A Two',
        type: 'number',
      },
      shift_a_twoHoursThree: {
        title: 'Shift A Three',
        type: 'number',
      },
      shift_a_twoHoursFour: {
        title: 'Shift A Four',
        type: 'number',
      },
      shift_a_twoHoursFive: {
        title: 'Shift A Five',
        type: 'number',
      },
      shift_a_twoHoursSix: {
        title: 'Shift A Six',
        type: 'number',
      },

      shift_b_twoHoursOne: {
        title: 'Shift B One',
        type: 'number',
      },
      shift_b_twoHoursTwo: {
        title: 'Shift B Two',
        type: 'number',
      },
      shift_b_twoHoursThree: {
        title: 'Shift B Three',
        type: 'number',
      },
      shift_b_twoHoursFour: {
        title: 'Shift B Four',
        type: 'number',
      },
      shift_b_twoHoursFive: {
        title: 'Shift B Five',
        type: 'number',
      },
      shift_b_twoHoursSix: {
        title: 'Shift B Six',
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
    private ringframeAllPara: RingframeService,
    private MachinePara: MachineParameterService,
    protected dateService: NbDateService<Date>,
    private timeGet: TimeGetService,
    private dialogService: NbDialogService,
    private _route: ActivatedRoute
  ) {
  }

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
    let Date10a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 02:00:00'));
    let Date12p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 04:00:00'));
    let Date2p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 06:00:00'));
    let Date4p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 08:00:00'));
    let Date6p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 10:00:00'));
    let Date8p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 12:00:00'));
    let Date10p = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 14:00:00'));
    let Date12a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 16:00:00'));
    let Date2a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 18:00:00'));
    let Date4a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 20:00:00'));
    let Date6a = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd 22:00:00'));
    let nowDate = new Date(this.datepipe.transform(this.todayDate, 'yyyy/MM/dd HH:mm:ss'));


    if ((Date8a < nowDate) && (nowDate < Date10a)) {
      this.shiftA1 = true;
    } else if ((Date10a < nowDate) && (nowDate < Date12p)) {
      this.shiftA2 = true;
    } else if ((Date12p < nowDate) && (nowDate < Date2p)) {
      this.shiftA3 = true;
    } else if ((Date2p < nowDate) && (nowDate < Date4p)) {
      this.shiftA4 = true;
    } else if ((Date4p < nowDate) && (nowDate < Date6p)) {
      this.shiftA5 = true;
    } else if ((Date6p < nowDate) && (nowDate < Date8p)) {
      this.shiftA6 = true;
    } else if ((Date8p < nowDate) && (nowDate < Date10p)) {
      this.shiftB1 = true;
    } else if ((Date10p < nowDate) && (nowDate < Date12a)) {
      this.shiftB2 = true;
    } else if ((Date12a < nowDate) && (nowDate < Date2a)) {
      this.shiftB3 = true;
    } else if ((Date2a < nowDate) && (nowDate < Date4a)) {
      this.shiftB4 = true;
    } else if ((Date4a < nowDate) && (nowDate < Date6a)) {
      this.shiftB5 = true;
    } else if (Date6a < nowDate) {
      this.shiftB6 = true;
    }

    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_SUPERVISOR') {
      this.superviser = true;
    } else if (role == 'ROLE_QC') {
      this.qc = true;
    }


    this.ringframepara = this.fb.group({
      ringframeparaData: this.fb.array([]),
    });
    this.SingleDate = this.fb.group({
      date: ['', Validators.required],
    });
    this.TwoDate = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
    this.SingleDatechart = this.fb.group({
      date: [this.dateService.format(new Date(), 'yyyy-MM-dd')],
      shift:[false]
    })

    this.ringframeparameterAOne = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterATwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterAThree = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterAFour = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterAFive = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterASix = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBOne = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBTwo = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBThree = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBFour = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBFive = this.fb.group({
      parareading: this.fb.array([]),
    });
    this.ringframeparameterBSix = this.fb.group({
      parareading: this.fb.array([]),
    });

    this.post.ViewAllRingframe().subscribe(data => {
      this.demo = data;

      let a = this.demo.length;
      if (a <= 0) {
        this.MachineNotFounderror = true;
      }
      for (let i = 0; i < a; i++) {
        this.ringframeGet.push(this.Ringframe(data[i]));
      }
    });

    this.MachinePara.DateSingleRingframe(this.dateService.format(this.todayDate, 'yyyy-MM-dd')).subscribe(data => {
      this.source = data.Data;
      let a = data.Data.length;
      if (a <= 0) {
        this.QcMachineParameterNotSetError = true;
      }
      for (let i = 0; i < a; i++) {
        this.RingframeParaAOneGet.push(this.RingframeParaAOne(data.Data[i]));
        this.RingframeParaATwoGet.push(this.RingframeParaATwo(data.Data[i]));
        this.RingframeParaAThreeGet.push(this.RingframeParaAThree(data.Data[i]));
        this.RingframeParaAFourGet.push(this.RingframeParaAFour(data.Data[i]));
        this.RingframeParaAFiveGet.push(this.RingframeParaAFive(data.Data[i]));
        this.RingframeParaASixGet.push(this.RingframeParaASix(data.Data[i]));

        this.RingframeParaBOneGet.push(this.RingframeParaBOne(data.Data[i]));
        this.RingframeParaBTwoGet.push(this.RingframeParaBTwo(data.Data[i]));
        this.RingframeParaBThreeGet.push(this.RingframeParaBThree(data.Data[i]));
        this.RingframeParaBFourGet.push(this.RingframeParaBFour(data.Data[i]));
        this.RingframeParaBFiveGet.push(this.RingframeParaBFive(data.Data[i]));
        this.RingframeParaBSixGet.push(this.RingframeParaBSix(data.Data[i]));

        if (data.Data[i].averageshift_a_HankOne == 0 && this.shiftA1) {
          this.shiftData = true;
        }
        if (data.Data[i].averageshift_a_HankTwo == 0 && this.shiftA2) {
          this.shiftData = true;
        }
        if (data.Data[i].averageshift_a_HankThree == 0 && this.shiftA3) {
          this.shiftData = true;
        }
        if (data.Data[i].averageshift_a_HankFour == 0 && this.shiftA4) {
          this.shiftData = true;
        }
        if (data.Data[i].averageshift_a_HankFive == 0 && this.shiftA5) {
          this.shiftData = true;
        }
        if (data.Data[i].averageshift_a_HankSix == 0 && this.shiftA6) {
          this.shiftData = true;
        }

        if (data.Data[i].averageshift_a_HankSeven == 0 && this.shiftB1) {
          this.shiftData1 = true;
        }
        if (data.Data[i].averageshift_a_HankEight == 0 && this.shiftB2) {
          this.shiftData1 = true;
        }
        if (data.Data[i].averageshift_a_HankNine == 0 && this.shiftB3) {
          this.shiftData1 = true;
        }
        if (data.Data[i].averageshift_a_HankTen == 0 && this.shiftB4) {
          this.shiftData1 = true;
        }
        if (data.Data[i].averageshift_a_HankEleven == 0 && this.shiftB5) {
          this.shiftData1 = true;
        }
        if (data.Data[i].averageshift_a_HankTwelev == 0 && this.shiftB6) {
          this.shiftData1 = true;
        }
        this.name.push(data.Data[i].ringframe.name);
        this.reding0.push(data.Data[i].productionSpindle2HoursKg);
        this.redingA1.push(data.Data[i].averageshift_a_HankOne);
        this.redingA2.push(data.Data[i].averageshift_a_HankTwo);
        this.redingA3.push(data.Data[i].averageshift_a_HankThree);
        this.redingA4.push(data.Data[i].averageshift_a_HankFour);
        this.redingA5.push(data.Data[i].averageshift_a_HankFive);
        this.redingA6.push(data.Data[i].averageshift_a_HankSix);

        this.redingB1.push(data.Data[i].averageshift_a_HankSeven);
        this.redingB2.push(data.Data[i].averageshift_a_HankEight);
        this.redingB3.push(data.Data[i].averageshift_a_HankNine);
        this.redingB4.push(data.Data[i].averageshift_a_HankTen);
        this.redingB5.push(data.Data[i].averageshift_a_HankEleven);
        this.redingB6.push(data.Data[i].averageshift_a_HankTwo);
      }

      if (this.admin && !this.MachineNotFounderror) {
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.name,
            datasets: this.datasets1
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
              },
            },
            responsive: true,
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          }
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

  get ringframeGet() {
    return this.ringframepara.get('ringframeparaData') as FormArray;
  }
  get RingframeParaAOneGet() {
    return this.ringframeparameterAOne.get('parareading') as FormArray;
  }
  get RingframeParaATwoGet() {
    return this.ringframeparameterATwo.get('parareading') as FormArray;
  }
  get RingframeParaAThreeGet() {
    return this.ringframeparameterAThree.get('parareading') as FormArray;
  }
  get RingframeParaAFourGet() {
    return this.ringframeparameterAFour.get('parareading') as FormArray;
  }
  get RingframeParaAFiveGet() {
    return this.ringframeparameterAFive.get('parareading') as FormArray;
  }
  get RingframeParaASixGet() {
    return this.ringframeparameterASix.get('parareading') as FormArray;
  }

  get RingframeParaBOneGet() {
    return this.ringframeparameterBOne.get('parareading') as FormArray;
  }
  get RingframeParaBTwoGet() {
    return this.ringframeparameterBTwo.get('parareading') as FormArray;
  }
  get RingframeParaBThreeGet() {
    return this.ringframeparameterBThree.get('parareading') as FormArray;
  }
  get RingframeParaBFourGet() {
    return this.ringframeparameterBFour.get('parareading') as FormArray;
  }
  get RingframeParaBFiveGet() {
    return this.ringframeparameterBFive.get('parareading') as FormArray;
  }
  get RingframeParaBSixGet() {
    return this.ringframeparameterBSix.get('parareading') as FormArray;
  }

  Ringframe(Data: any) {
    return this.fb.group({
      spindleRpm: ['', Validators.required],
      type: ['', Validators.required],
      ringFrameCount: ['', Validators.required],
      tm: ['', Validators.required],
      machineEfficiency: ['97', Validators.required],
      pneumafilWaste: ['1.50', Validators.required],
      idleSpindle: ['0.10', Validators.required],
      doffingLoss: ['0.50', Validators.required],
      shiftDate: [this.dateService.format(this.time, 'yyyy-MM-dd')],
      ringframe: [Data],
    });
  }
  RingframeParaAOne(cc: any) {
    return this.fb.group({
      shift_a_twoHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaATwo(cc: any) {
    return this.fb.group({
      shift_a_twoHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaAThree(cc: any) {
    return this.fb.group({
      shift_a_twoHoursThree: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaAFour(cc: any) {
    return this.fb.group({
      shift_a_twoHoursFour: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaAFive(cc: any) {
    return this.fb.group({
      shift_a_twoHoursFive: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaASix(cc: any) {
    return this.fb.group({
      shift_a_twoHoursSix: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBOne(cc: any) {
    return this.fb.group({
      shift_b_twoHoursOne: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBTwo(cc: any) {
    return this.fb.group({
      shift_b_twoHoursTwo: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBThree(cc: any) {
    return this.fb.group({
      shift_b_twoHoursThree: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBFour(cc: any) {
    return this.fb.group({
      shift_b_twoHoursFour: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBFive(cc: any) {
    return this.fb.group({
      shift_b_twoHoursFive: ['', Validators.required],
      description: [cc],
    });
  }
  RingframeParaBSix(cc: any) {
    return this.fb.group({
      shift_b_twoHoursSix: ['', Validators.required],
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
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 110 && event.which != 190 && event.which != 8)) {
      event.preventDefault();
    }
  }
  // hideshiftchart() {
  //   this.chart.data.datasets.pop(6);
  //   this.chart.update();
  // }
  onSingleDateChartSubmit() {
    this.MachinePara.DateSingleRingframe(this.SingleDatechart.value.date).subscribe(data => {
      let a = data.Data.length;
      for (let i = 0; i < a; i++) {
        this.reding0[i] = data.Data[i].productionSpindle2HoursKg;
        this.redingA1[i] = data.Data[i].averageshift_a_HankOne;
        this.redingA2[i] = data.Data[i].averageshift_a_HankTwo;
        this.redingA3[i] = data.Data[i].averageshift_a_HankThree;
        this.redingA4[i] = data.Data[i].averageshift_a_HankFour;
        this.redingA5[i] = data.Data[i].averageshift_a_HankFive;
        this.redingA6[i] = data.Data[i].averageshift_a_HankSix;

        this.redingB1[i] = data.Data[i].averageshift_a_HankSeven;
        this.redingB2[i] = data.Data[i].averageshift_a_HankEight;
        this.redingB3[i] = data.Data[i].averageshift_a_HankNine;
        this.redingB4[i] = data.Data[i].averageshift_a_HankTen;
        this.redingB5[i] = data.Data[i].averageshift_a_HankEleven;
        this.redingB6[i] = data.Data[i].averageshift_a_HankTwo;

        if (i + 1 == a) {
          this.chart.update();
        }
      }
    })
  }

  onDateSingleSubmit() {
    let date = this.SingleDate.value.date;
    if (date != '') {
      this.MachinePara.DateSingleRingframe(this.dateService.format(date, 'yyyy-MM-dd')).subscribe(data => {
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
      this.MachinePara.DateRingframe(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
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
    this.MachinePara.DownloadSingleRingframe(this.dateService.format(start, 'yyyy-MM-dd')).subscribe(data => {

      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Ringframe' + start + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }
  download() {
    let start = this.TwoDate.value.start;
    let end = this.TwoDate.value.end;
    this.MachinePara.DownloadRingframe(this.dateService.format(start, 'yyyy-MM-dd'), this.dateService.format(end, 'yyyy-MM-dd')).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const file = new File([blob], 'Ringframe' + start + ' to ' + end + '.xlsx',
        { type: 'application/vnd.ms-excel' });
      fileSaver.saveAs(file);
    });
  }

  onRingframeSubmit() {
    this.ringframepara.markAsDirty();
    let a = this.ringframepara.value.ringframeparaData;
    for (let i = 0; i < a.length; i++) {
      this.MachinePara.AddRingframeParameter(a[i]).subscribe((data: any) => {

        this.ringframepara.reset();
        this.ngOnInit();
      });
    }
    this.ngOnInit();
    alert("Date Submited Success Fully...");
  }

  onRingframeParameterAoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterAOne.value.parareading.length; i++) {
      let Mid = this.ringframeparameterAOne.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursOne': this.ringframeparameterAOne.value.parareading[i].shift_a_twoHoursOne }
      this.ringframeAllPara.RingframeParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterAOne.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterAtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterATwo.value.parareading.length; i++) {
      let Mid = this.ringframeparameterATwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursTwo': this.ringframeparameterATwo.value.parareading[i].shift_a_twoHoursTwo }

      this.ringframeAllPara.RingframeParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterATwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterAthreeSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterAThree.value.parareading.length; i++) {
      let Mid = this.ringframeparameterAThree.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursThree': this.ringframeparameterAThree.value.parareading[i].shift_a_twoHoursThree }

      this.ringframeAllPara.RingframeParameterShiftAThree(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterAThree.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterAfourSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterAFour.value.parareading.length; i++) {
      let Mid = this.ringframeparameterAFour.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursFour': this.ringframeparameterAFour.value.parareading[i].shift_a_twoHoursFour }

      this.ringframeAllPara.RingframerParameterShiftAFour(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterAFour.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterAfiveSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterAFive.value.parareading.length; i++) {
      let Mid = this.ringframeparameterAFive.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursFive': this.ringframeparameterAFive.value.parareading[i].shift_a_twoHoursFive }
      this.ringframeAllPara.RingframeParameterShiftAFive(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterAFive.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterAsixSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterASix.value.parareading.length; i++) {
      let Mid = this.ringframeparameterASix.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_a_twoHoursSix': this.ringframeparameterASix.value.parareading[i].shift_a_twoHoursSix }

      this.ringframeAllPara.RingframeParameterShiftASix(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterASix.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }

  onRingframeParameterBoneSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBOne.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBOne.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursOne': this.ringframeparameterBOne.value.parareading[i].shift_b_twoHoursOne }

      this.ringframeAllPara.RingframeParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBOne.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterBtwoSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBTwo.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBTwo.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursTwo': this.ringframeparameterBTwo.value.parareading[i].shift_b_twoHoursTwo }

      this.ringframeAllPara.RingframeParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBTwo.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterBthreeSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBThree.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBThree.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursThree': this.ringframeparameterBThree.value.parareading[i].shift_b_twoHoursThree }
      this.ringframeAllPara.RingframeParameterShiftBThree(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBThree.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterBfourSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBFour.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBFour.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursFour': this.ringframeparameterBFour.value.parareading[i].shift_b_twoHoursFour }

      this.ringframeAllPara.RingframeParameterShiftBFour(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBFour.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterBfiveSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBFive.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBFive.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursFive': this.ringframeparameterBFive.value.parareading[i].shift_b_twoHoursFive }

      this.ringframeAllPara.RingframeParameterShiftBFive(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBFive.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  onRingframeParameterBsixSubmit() {
    let check = 1;
    for (let i = 0; i < this.ringframeparameterBSix.value.parareading.length; i++) {
      let Mid = this.ringframeparameterBSix.value.parareading[i].description.machineId;
      let Paravalue = { 'shift_b_twoHoursSix': this.ringframeparameterBSix.value.parareading[i].shift_b_twoHoursSix }

      this.ringframeAllPara.RingframeParameterShiftBSix(Mid, Paravalue).subscribe((data: any) => {
        if (check++ == this.ringframeparameterBSix.value.parareading.length) {
          this.NbDialogRef.close();
          location.reload();
        }
      });
    }
  }
  // demodd(event: any) {
  //   let Mid = event.value.description.machineId;
  //   let Paravalue;
  //   if (this.shiftA1) {
  //     Paravalue = { 'shift_a_twoHoursOne': event.value.shift_a_twoHoursOne }
  //     this.ringframeAllPara.RingframeParameterShiftAOne(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A1 paraset');
  //     });
  //   } else if (this.shiftA2) {
  //     Paravalue = { 'shift_a_twoHoursTwo': event.value.shift_a_twoHoursTwo }
  //     this.ringframeAllPara.RingframeParameterShiftATwo(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A2 paraset');
  //     });
  //   } else if (this.shiftA3) {
  //     Paravalue = { 'shift_a_twoHoursThree': event.value.shift_a_twoHoursThree }
  //     this.ringframeAllPara.RingframeParameterShiftAThree(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A3 paraset');
  //     });
  //   } else if (this.shiftA4) {
  //     Paravalue = { 'shift_a_twoHoursFour': event.value.shift_a_twoHoursFour }
  //     this.ringframeAllPara.RingframerParameterShiftAFour(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A4 paraset');
  //     });
  //   } else if (this.shiftA5) {
  //     Paravalue = { 'shift_a_twoHoursFive': event.value.shift_a_twoHoursFive }
  //     this.ringframeAllPara.RingframeParameterShiftAFive(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A5 paraset');
  //     });
  //   } else if (this.shiftA6) {
  //     Paravalue = { 'shift_a_twoHoursSix': event.value.shift_a_twoHoursSix }
  //     this.ringframeAllPara.RingframeParameterShiftASix(Mid, Paravalue).subscribe((data: any) => {
  //       alert('A6 paraset');
  //     });
  //   } else if (this.shiftB1) {
  //     Paravalue = { 'shift_b_twoHoursOne': event.value.shift_b_twoHoursOne }
  //     this.ringframeAllPara.RingframeParameterShiftBOne(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B1 paraset');
  //     });
  //   } else if (this.shiftB2) {
  //     Paravalue = { 'shift_b_twoHoursTwo': event.value.shift_b_twoHoursTwo }
  //     this.ringframeAllPara.RingframeParameterShiftBTwo(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B2 paraset');
  //     });
  //   } else if (this.shiftB3) {
  //     Paravalue = { 'shift_b_twoHoursThree': event.value.shift_b_twoHoursThree }
  //     this.ringframeAllPara.RingframeParameterShiftBThree(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B3 paraset');
  //     });
  //   } else if (this.shiftB4) {
  //     Paravalue = { 'shift_b_twoHoursFour': event.value.shift_b_twoHoursFour }
  //     this.ringframeAllPara.RingframeParameterShiftBFour(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B4 paraset');
  //     });
  //   } else if (this.shiftB5) {
  //     Paravalue = { 'shift_b_twoHoursFive': event.value.shift_b_twoHoursFive }
  //     this.ringframeAllPara.RingframeParameterShiftBFive(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B5 paraset');
  //     });
  //   } else if (this.shiftB6) {
  //     Paravalue = { 'shift_b_twoHoursSix': event.value.shift_b_twoHoursSix }
  //     this.ringframeAllPara.RingframeParameterShiftBSix(Mid, Paravalue).subscribe((data: any) => {
  //       alert('B6 paraset');
  //     });
  //   }
  //   this.ngOnInit();
  // }

}
