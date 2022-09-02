import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../../@service/machine/machine.service';

@Component({
  selector: 'ngx-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent implements OnInit {

  demo:any;

  constructor(private post: MachineService) {
  }

  ngOnInit(): void {
    this.post.ViewAllUtility().subscribe(data => {
       this.demo = data;
    });
  }
}
