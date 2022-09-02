import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';
import { ItemService } from '../../../../@service/store/item.service';

@Component({
  selector: 'ngx-add-vender',
  templateUrl: './add-vender.component.html',
  styleUrls: ['./add-vender.component.scss']
})
export class AddVenderComponent implements OnInit {

  venderForm: FormGroup;
  item: any;
  DataTransfer = [];

  constructor(
    private fb: FormBuilder,
    private venderService: VenderService,
    private postItem: ItemService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {

    this.postItem.ViewItem().subscribe((data) => {
      this.item = data.Data;
    });

    this.venderForm = this.fb.group({
      vendorName: ['', Validators.required],
      vendorAddress: ['', Validators.required],
      vendorcode: ['', [Validators.required, Validators.pattern]],
      paymentTermsConditions: [null, Validators.required],
      paymentDays:[''],
      city: [''],
      pincode: [''],
      gstno: [''],
      panno: [''],
      itemDemo: [null]
    });
  }

  changeItem(event) {
    this.DataTransfer.length = 0;
    for (let i = 0; i < event.length; i++) {
      this.DataTransfer.push({ 'itemId': event[i] })
    }
  }
  onVenderSubmit() {
    this.venderForm.removeControl('itemDemo');
    this.venderForm.addControl('itemData', this.fb.control(this.DataTransfer));

    this.venderService.CreateVender(this.venderForm.value).subscribe((data: any) => {
      this.allAlert('success', `Vender Created !`, 'Successfully Vender Created');
      this.ngOnInit();
      this.venderForm.reset();
    },
      (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      })
  }

  allAlert(alertMsg, headMsg, msg) {
    const config = {
      status: alertMsg,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(
      `${msg}`,
      `${headMsg}`,
      config);
  }
}
