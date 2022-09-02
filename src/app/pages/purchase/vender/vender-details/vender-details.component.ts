import { Component, OnInit } from '@angular/core';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';

@Component({
  selector: 'ngx-vender-details',
  templateUrl: './vender-details.component.html',
  styleUrls: ['./vender-details.component.scss']
})
export class VenderDetailsComponent implements OnInit {


  source: any = [];
  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      vendorName: {
        title:  'Vender Name',
        type: 'string',
      },
      vendorAddress: {
        title:  'Vender Address',
        type: 'string',
      },
      vendorcode: {
        title:  'Vender Code',
        type: 'number',
      },
      gstno: {
        title:  'Vender GST',
        type: 'string',
      },
      panno: {
        title:  'Vender PAN No.',
        type: 'string',
      },
      paymentTermsConditions: {
        title: 'Payment Terms Conditions',
        type: 'string',
      }
    },
  };

  constructor(private post: VenderService) { }

  ngOnInit(): void {
    this.post.ViewVender().subscribe(data => {
      this.source = data.Data;
    });
  }

}
