import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../../@service/machine/machine.service';

@Component({
  selector: 'ngx-wasteroom',
  templateUrl: './wasteroom.component.html',
  styleUrls: ['./wasteroom.component.scss']
})
export class WasteroomComponent implements OnInit {

  demo:any;

  constructor(private post: MachineService) {
  }

  ngOnInit(): void {
    this.post.ViewAllWasteroom().subscribe(data => {
       this.demo = data;
    });
  }
}
