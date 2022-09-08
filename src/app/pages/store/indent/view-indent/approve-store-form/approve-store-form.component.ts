import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { VenderService } from '../../../../../@service/purchase/vender/vender.service';
import { IndentService } from '../../../../../@service/store/indent.service';

@Component({
  selector: 'ngx-approve-store-form',
  templateUrl: './approve-store-form.component.html',
  styleUrls: ['./approve-store-form.component.scss']
})
export class ApproveStoreFormComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  role_idMain: number;
  IndentStatusChange: FormGroup;
  IndentStatusChangeData: FormGroup;
  price: any = [];
  VenderSource: any = [];
  @Input() itemData: any;
  @Input() indentId: number;

  constructor(
    protected ref: NbDialogRef<ApproveStoreFormComponent>,
    private _auth: LoginService,
    private fb: FormBuilder,
    private _vender: VenderService,
    private _indent: IndentService,
  ) { }

  ngOnInit(): void {

    let role = this._auth.user.roles.find((x => x));
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
    
    this.IndentStatusChangeData = this.fb.group({
      indentStatus: ['ADMIN_LAST'],
      comment: ['Vender Select And Price Set', Validators.required],
      employee: this.fb.group({
        id: [this.role_idMain],
      }),
      vendorWisePriceSet: this.fb.array([]),
    });

    this.IndentStatusChange = this.fb.group({
      vendorWisePriceSet: this.fb.array([]),
    });

    this._vender.ViewVender().subscribe((data: any) => {
      this.VenderSource = data.Data;
    });
    this.vendorWisePriceSetAdd();
  }

  vendorWisePriceSetAdd() {
    this.AddvendorWiseGet.push(this.AddvendorWisePriceSet());
    for(let i = 0; i< this.itemData.length; i++) {
      this.AddPriceGet(this.AddvendorWiseGet.length-1).push(this.Price(this.itemData[i].storeItemIndentQuantityData.itemId));
    }
  }

  get AddvendorWiseGet() {
    return (this.IndentStatusChange.get('vendorWisePriceSet')) as FormArray;
  }

  AddvendorWisePriceSet() {
    return this.fb.group({
      itemModelPrice: this.fb.group({
        itemId: [null]
      }),
      priceItem: this.fb.array([]),
      vendorModelData: this.fb.group({
        id: [null, Validators.required]
      }),
    });
  }

  Price(event: number) {
    return this.fb.group({
      item:[event, Validators.required],
      price:[null, Validators.required]
    })
  }

  setFormData() {
    return this.fb.group({
      itemModelPrice: this.fb.group({
        itemId: [null]
      }),
      vendorModelData: this.fb.group({
        id: [null]
      }),
      priceItem: [null]
    })
  }

  AddVenderRemove(i: number) {
    if (i >= 1) {
      this.AddvendorWiseGet.removeAt(i);
    }
  }

  AddPriceGet(i: number) {
    return this.AddvendorWiseGet.at(i).get('priceItem') as FormArray;
  }

  onSubmitData() {
    let MainData: any = [];
    let a = this.IndentStatusChange.value.vendorWisePriceSet;
    for(let i = 0; i < a.length; i++) {
      let b = this.IndentStatusChange.value.vendorWisePriceSet[i].priceItem;
      for(let j = 0; j < b.length; j++) {
        let z = this.fb.group({
          itemModelPrice: this.fb.group({
            itemId: [b[j].item]
          }),
          vendorModelData: this.fb.group({
            id: [a[i].vendorModelData.id]
          }),
          priceItem: [b[j].price]
        });

        MainData.push(z);
        (this.IndentStatusChangeData.get('vendorWisePriceSet') as FormArray).push(z);
      }
    }
    this._indent.StatusUpdateIndent(this.indentId, this.IndentStatusChangeData.value).subscribe((data: any) => {
        this.ngOnInit();
        this.ref.close();
      });
  }



}
