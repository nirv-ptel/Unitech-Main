import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../../@service/auth/login.service';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';
import { IndentService } from '../../../../@service/store/indent.service';
import { ItemService } from '../../../../@service/store/item.service';
import { ResponceService } from '../../../../@service/store/responce.service';
import { UserService } from '../../../../@service/user/user.service';

@Component({
  selector: 'ngx-add-indent',
  templateUrl: './add-indent.component.html',
  styleUrls: ['./add-indent.component.scss']
})
export class AddIndentComponent implements OnInit {

  IndentForm: FormGroup;
  ResponceForm: FormGroup;

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  role_idMain: number;
  role_usernameMain: string;

  statuschange: any;
  item: any;
  DataTransferVender = [];
  vendorDate: [];
  vendorDetails: [];

  constructor(
    private dialogService: NbDialogService,
    private _auth: LoginService,
    private _user: UserService,
    private fb: FormBuilder,
    private post: IndentService,
    private postItem: ItemService,
    private postResponce: ResponceService,
    private toastrService: NbToastrService,
    private venderService: VenderService,
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    let role = this._auth.user.roles.find((x => x));
    let role_id = this._auth.user.userId;
    this.role_idMain = this._auth.user.userId;
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_MAINTENANCE') {
      this.maintanance = true;
    } else if (role == 'ROLE_STORE') {
      this.store = true;
    } else if (role == 'ROLE_GENERALMANAGER') {
      this.gm = true;
    } else if (role == 'ROLE_ACCOUNT') {
      this.account = true;
    }

    this.IndentForm = this.fb.group({
      indentQuantityList: this.fb.array([this.AddIndents()]),
      employee: this.fb.group({
        id: [this.role_idMain],
        username: [this.role_usernameMain],
      }),
    })

    this.ResponceForm = this.fb.group({
      resStatus: ['INDENT'],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [true],
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id]
      })
    })

    this.postItem.ViewItem().subscribe(data => {
      this.item = data.Data;
    });
    this._user.ViewUserProfile(this.role_idMain).subscribe(data => {
      this.role_usernameMain = data.username;
      this.IndentForm.get('employee').get('username').setValue(data.username);
    })
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 190 && event.which != 46 && event.which != 37 && event.which != 39)) {
      event.preventDefault();
    }
  }

  IndnetAdd() {
    this.AddIndentGet.push(this.AddIndents());
  }

  get AddIndentGet() {
    return this.IndentForm.get('indentQuantityList') as FormArray;
  }
  AddIndentRemove(i: number) {
    if (i >= 1) {
      this.AddIndentGet.removeAt(i);
    }
  }

  AddIndents() {
    return this.fb.group({
      estimatedPrice: [null, Validators.required],
      quantity: ['', Validators.required],
      storeItemIndentQuantityData: this.fb.group({
        itemId: [null, Validators.required]
      }),
      employee: this.fb.group({
        id: [this.role_idMain, Validators.required]
      }),
      tax: [null],
      BasicAmmount: [null],
      TotalAmmount: [null]
    });
  }

  onIndentFormSubmit() {
    let a = this.IndentForm.get('indentQuantityList').value;
    
    for( let i = 0; i < a.length; i++) {
      let reValue:FormGroup = this.IndentForm.get('indentQuantityList').get([i])  as FormGroup;
      reValue.removeControl('employee');
      reValue.removeControl('tax');
      reValue.removeControl('BasicAmmount');
      reValue.removeControl('TotalAmmount');
    }
    this.post.CreateIndent(this.IndentForm.value).subscribe((data: any) => {
      
      let indentId = data.Data.indentId;
      let aaa = data.Data.indentQuantityList.length;
      let check = 1;
      for(let j = 0; j < aaa; j++) {
        this.post.IndentIdAddQuantity(indentId,data.Data.indentQuantityList[j].quantityId).subscribe((data: any) => {
          if (check++ == aaa) {
            this.ResponceForm.get('coments').setValue("create indent");
            this.ResponceForm.get('remarks').setValue("create indent");
            this.ResponceForm.get('pdiId').setValue(indentId);
            this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
              this.allAlert('success', `Indent Created !`, 'Successfully Create Indent');
              this.ngOnInit();
            }, (error: any) => {
              this.ngOnInit();
              this.allAlert('danger', `Not Created !`, `${error.error.message}`);
            })
          }
          })
      }
    });
  }

  ItemPriceTotal(event, i: number) {
    this.IndentForm.get('indentQuantityList').get([i]).get('tax').setValue(null);
    this.postItem.FindByIdItem(event).subscribe((data: any) => {
      this.IndentForm.get('indentQuantityList').get([i]).get('tax').setValue(data.Data.paytax);
      this.taxToatalQantity(i);
    })
    // Estimeted Unit price
    this.post.IndentEstimetedPrice(event).subscribe((data: any) => {
      let price = data.Data.estimatedPrice;
    
      if(price != null) {
        this.IndentForm.get('indentQuantityList').get([i]).get('estimatedPrice').setValue(price);
      } else {
        this.IndentForm.get('indentQuantityList').get([i]).get('estimatedPrice').setValue(0);
      }
    })
  }

  taxToatalQantity(i: number) {
    let quantity = this.IndentForm.value.indentQuantityList[i].quantity;
    let estimatedPrice = this.IndentForm.value.indentQuantityList[i].estimatedPrice;
    let tax = this.IndentForm.value.indentQuantityList[i].tax;
       
    this.IndentForm.get('indentQuantityList').get([i]).get('BasicAmmount').setValue(quantity * estimatedPrice);
    this.IndentForm.get('indentQuantityList').get([i]).get('TotalAmmount').setValue((quantity * estimatedPrice * tax / 100)+ quantity * estimatedPrice);
  }

  backClicked() {
    this._location.back();
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
