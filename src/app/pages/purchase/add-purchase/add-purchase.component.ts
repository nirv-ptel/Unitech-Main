import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PurchaseService } from '../../../@service/purchase/purchase.service';

@Component({
  selector: 'ngx-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {

  purchase: FormGroup;

  constructor(private fb: FormBuilder,private purcharData: PurchaseService) { }

  ngOnInit(): void {
    this.purchase = this.fb.group({
      datePurchase: [''],
      partyName: [''],
      partyPlotNo: [''],
      miliLotNo: [''],
      mic: [''],
      length: [''],
      strentH: [''],
      sfi: [''],
      rd: [''],
      bplus: [''],
      trash: [''],
      moistureContent: [''],
      openingStock: [''],
      purchaseBales: [''],
      issueBales: [''],
      closingStock: [''],
    });
  }

  onPurchaseSubmit() {
    this.purcharData.CreatePurchase(this.purchase.value).subscribe((data:any) => {
      alert("Date Submited Success Fully...");
      this.purchase.reset();
    });
  }


}
