import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../../@service/machine/machine.service';

@Component({
  selector: 'ngx-winding',
  templateUrl: './winding.component.html',
  styleUrls: ['./winding.component.scss']
})
export class WindingComponent implements OnInit {

  demo:any;

  constructor(private post: MachineService) {
  }

  ngOnInit(): void {
    // this.post.ViewAllWinding().subscribe(data => {
    //    this.demo = data;
    // });
  }
}
