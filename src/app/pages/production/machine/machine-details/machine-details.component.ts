import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MachineService } from '../../../../@service/machine/machine.service';
// import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {

  id: number;

  source: any = [];
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      machineId: {
        title: 'ID',
        type: 'number',
      },
      deliveryspeed: {
        title: 'DELIVERY SPEED',
        type: 'number',
      },
      silverhank: {
        title: 'SILVER HANK',
        type: 'number',
      },
      machineefficency: {
        title: 'MACHINE EFFICENCY',
        type: 'number',
      },
      productiononratekgcardperhour: {
        title: 'PRODUCTION ON RATE +(KG/CARD/HOUR)',
        type: 'number',
      },
      machineefficencykgcardpershift: {
        title: 'PRODUCTION ON RATE (KG/CARD/SHIFT)',
        type: 'number',
      },
      machineefficencykgcardpersixhours: {
        title: 'PRODUCTION ON RATE (KG/CARD/6 HRS)',
        type: 'number',
      },
      machineefficencykgcardperday: {
        title: 'PRODUCTION ON RATE (KG/CARD/DAY)',
        type: 'number',
      },
    },
  };

  constructor(private post: MachineService, private route: ActivatedRoute, private modalService: NgbModal) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    this.post.ViewOneBloowRoom(this.id).subscribe(data => {
      this.source = data.bloowroomReading;
    });
  }

  ngOnDestroy(): void { }

}
