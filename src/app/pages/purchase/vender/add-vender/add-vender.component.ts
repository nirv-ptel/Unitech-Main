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
      paymentTermsConditions: [null, Validators.required],
      paymentDays:[''],
      gstno: [''],
      panno: [''],
      gstStatus: [''],
      msmeType: [''],
      factory: [''],
      msgmeRegisterDate: [''],
      gstForm: [''],
      gstTo: [''],
      centralgst: [''],
      stategst: [''],
      integratedgst: [''],
      sezNumber: [''],
      refrencesBy: [''],
      bankName: [''],
      branchName: [''],
      bankCityName: [''],
      bankAccountNumber: [''],
      ifscCode: [''],
      micrCode: [''],
      cancelChequeNumber: [''],
      supplierscode: [''],
      accountGroupHead: [''],
      natureOfBussiness: [''],
      officePhoneNumber: [''],
      ResidentPhoneNumber: [''],
      vendorEmail: [''],
      webSite: [''],
      faxNumber: [''],
      dateOfIncorporation: [''],
    });
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
