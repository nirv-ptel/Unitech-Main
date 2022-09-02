import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../../@service/machine/machine.service';

@Component({
  selector: 'ngx-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent implements OnInit {

  demo:any;

  constructor(private post: MachineService) {
  }

  ngOnInit(): void {
    this.post.ViewAllPacking().subscribe(data => {
       this.demo = data;
    });
  }
}
