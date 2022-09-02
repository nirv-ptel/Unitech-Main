import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseService } from '../../../@service/purchase/purchase.service';

@Component({
  selector: 'ngx-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {

  source: any = [];
  settings = {
    actions:{
      delete: false,
      add: false,
      edit: false,
    },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      datePurchase: {
        title: 'date Purchase',
        type: 'string',
      },
      partyName: {
        title: 'Party Name',
        type: 'string',
      },
      partyPlotNo: {
        title: 'Party Plot No',
        type: 'string',
      },
      miliLotNo: {
        title: 'Mill Lot No',
        type: 'string',
      },
    },
  };

  constructor(private post: PurchaseService, private route: ActivatedRoute, private modalService: NgbModal) {
  }

  ngOnInit(): void {
   this.post.ViewPurchase().subscribe(data => {
    this.source = data;
   });
  }

}
