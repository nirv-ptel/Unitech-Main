import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbDateService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import { MachineParameterService } from '../../@service/machine-parameter/machine-parameter.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  capturedImage;
  chart;
  labels = [];
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
  datasets = [
    {
      label: 'QC ',
      data: this.reding0,
      backgroundColor: '#36a2eb',
      fill: true,
      stack: 'Stack 1',
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
      backgroundColor: '#707378',
      stack: 'Stack 1',
    },
    {
      label: '8 PM',
      data: this.redingA6,
      backgroundColor: 'rgba(255, 59, 132)',
      stack: 'Stack 1',
    },
    {
      label: '10 PM',
      data: this.redingB1,
      backgroundColor: 'rgba(255, 99, 102)',
      stack: 'Stack 1',
    },
    {
      label: '12 AM',
      data: this.redingB2,
      backgroundColor: 'rgba(5, 99, 132)',
      stack: 'Stack 1',
    },
    {
      label: '2 AM',
      data: this.redingB3,
      backgroundColor: 'rgba(255, 99, 132)',
      stack: 'Stack 1',
    },
    {
      label: '4 AM',
      data: this.redingB4,
      backgroundColor: 'rgba(255, 99, 132)',
      stack: 'Stack 1',
    },
    {
      label: '6 AM',
      data: this.redingB5,
      backgroundColor: 'rgba(255, 99, 132)',
      stack: 'Stack 1',
    },
    {
      label: '8 AM',
      data: this.redingB6,
      backgroundColor: 'rgba(255, 99, 132)',
      stack: 'Stack 1',
    },
  ];
  SingleDate: FormGroup;

  constructor(private fb: FormBuilder, protected dateService: NbDateService<Date>, private MachinePara: MachineParameterService) {
  }

  ngOnInit(): void {
    this.SingleDate = this.fb.group({
      date: [this.dateService.format(new Date(), 'yyyy-MM-dd')]
    })

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        datasets: [
          {
            label: 'First',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            fill: false,
          }]
      }
    });

    this.chart = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'First',
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)'
            ],
            fill: false,
          }]
      }
    });

    // this.chart = new Chart('canvas2',{
    //   type: 'radar',
    //   data: {
    //     labels: ['Red','Green','Yellow','Grey','Blue'],
    //     datasets: [
    //       {
    //       label: 'First',
    //       data: [11, 16, 7, 3, 14],
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //       borderColor: 'rgb(255, 99, 132)',
    //       pointBackgroundColor: 'rgb(255, 99, 132)',
    //       pointBorderColor: '#fff',
    //       pointHoverBackgroundColor: '#fff',
    //       pointHoverBorderColor: 'rgb(255, 99, 132)',
    //       fill: true,
    //       }]
    //   }
    // });
    this.MachinePara.DateSingleRingframe(this.SingleDate.value.date).subscribe(data => {
      // console.warn(data.Data);

      let a = data.Data.length;
      for (let i = 0; i < a; i++) {
        this.labels.push(data.Data[i].ringframe.name);
        this.reding0.push(data.Data[i].productionSpindle2HoursKg);
        this.redingA1.push(data.Data[i].averageshift_a_HankOne);
        this.redingA2.push(data.Data[i].averageshift_a_HankTwo);
        this.redingA3.push(data.Data[i].averageshift_a_HankThree);
        this.redingA4.push(data.Data[i].averageshift_a_HankFour);
        this.redingA5.push(data.Data[i].averageshift_a_HankFive);
        this.redingA6.push(data.Data[i].averageshift_a_HankSix);

        this.redingB1.push(data.Data[i].averageshift_b_HankOne);
        this.redingB2.push(data.Data[i].averageshift_b_HankTwo);
        this.redingB3.push(data.Data[i].averageshift_b_HankThree);
        this.redingB4.push(data.Data[i].averageshift_b_HankFour);
        this.redingB5.push(data.Data[i].averageshift_b_HankFive);
        this.redingB6.push(data.Data[i].averageshift_b_HankSix);
        if(i + 1 == a) {
        
          // console.warn(this.datasets);
          // console.warn(this.datasets1);
          this.chart.update();
        }
      }
    })

    this.chart = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.datasets
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

  addCol() {

    this.MachinePara.DateSingleRingframe(this.SingleDate.value.date).subscribe(data => {
      console.warn(this.SingleDate.value.date);

      let a = data.Data.length;
      for (let i = 0; i < a; i++) {
        // this.labels.push(data.Data[i].ringframe.name);
        // this.reding0[i].push(data.Data[i].productionSpindle2HoursKg);
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
        if(i + 1 == a) {
          // this.chart.data.datasets = [];
          // for (let j = 0; j < this.datasets1.length; j++) {
          //   this.chart.data.datasets.push(this.datasets1[j]);
          // }
          // console.warn(this.datasets);
          // console.warn(this.datasets1.length);
          this.chart.update();
        }
      }
    })
   

  }

  image(image: string) {
    alert('image');
    html2canvas(document.querySelector(image)).then((canvas) => {
      this.capturedImage = canvas.toDataURL();
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'somefilename.jpg';
      a.click();
    });
  }
}
