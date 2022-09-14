import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { VenderService } from '../../../../../@service/purchase/vender/vender.service';
import { IndentService } from '../../../../../@service/store/indent.service';
import { ItemService } from '../../../../../@service/store/item.service';
import { UserService } from '../../../../../@service/user/user.service';

@Component({
  selector: 'ngx-appprove-admin-form',
  templateUrl: './appprove-admin-form.component.html',
  styleUrls: ['./appprove-admin-form.component.scss']
})
export class AppproveAdminFormComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  role_idMain: number;

  FinalForm: FormGroup;

  ItemVenderSorce: any = [];
  ItemId: any = [];
  ItemData: any = [];
  VenderId: any = [];
  VenderData: any = [];

  @Input() indentId: number;

  constructor(
    protected ref: NbDialogRef<AppproveAdminFormComponent>,
    private _auth: LoginService,
    private _user: UserService,
    private fb: FormBuilder,
    private post: IndentService,
    private _item: ItemService,
    private _vender: VenderService
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

    this.post.ViewVenderById(this.indentId).subscribe((data: any) => {
      this.ItemVenderSorce = data.Data;
    })
    this.post.ViewVenderByIdItemId(this.indentId).subscribe((data: any) => {
      this.ItemId = data.Data;
      for (let i = 0; i < this.ItemId.length; i++) {
        this._item.FindByIdItem(this.ItemId[i]).subscribe((data: any) => {
          this.ItemData.push(data.Data);
        })
      }
    })

    this.post.ViewVenderByIdVenderId(this.indentId).subscribe((data: any) => {
      this.VenderId = data.Data;
      this.demo();
    })

    this.FinalForm = this.fb.group({
      A: this.fb.array([])
    })

  }
  demo() {
    for (let i = 0; i < this.VenderId.length; i++) {
      this._vender.ViewVenderById(this.VenderId[i]).subscribe((data: any) => {
        this.VenderData.push(data.Data);
        this.AddRow(this.VenderId[i]);
      })

    }
  }

  AddRow(event) {
    this.Arow.push(this.AddCol());
    for (let i = 0; i < this.ItemId.length; i++) {
      let aa = this.ItemVenderSorce.filter(p => ((p.vendorModelData.id === event) && (p.itemModelPrice.itemId === this.ItemId[i]))) as FormArray;
      this.BCol(this.Arow.length - 1).push(this.AddRows(this.ItemId[i], event, aa));
    }
  }

  get Arow() {
    return (this.FinalForm.get('A')) as FormArray;
  }
  BCol(i: number) {
    return this.Arow.at(i).get('B') as FormArray;
  }

  AddCol() {
    return this.fb.group({
      B: this.fb.array([]),
    });
  }

  AddRows(event: any, event1: any, event2: any) {
    return this.fb.group({
      item: [event, Validators.required],
      Vender: [event1, Validators.required],
      VenderDetail: [event2[0].vendorModelData.vendorName],
      DataIV: [event2],
      priceId: [event2[0].priceItem],
      price_Id:[event2[0].price_id],
      final: [false]
    })
  }

  demos() {
    let z = [];
    let final = this.FinalForm.get('A').value;
    for (let i = 0; i < final.length; i++) {
      let b = final[i].B;
      for (let j = 0; j < b.length; j++) {
        if (b[j].final) {
          z.push(b[j]);
        }
      }
    }

    for (let i = 0; i < this.VenderId.length; i++) {  
      let aa = z.filter(p => ((p.Vender == this.VenderId[i])));
      let cc = this.fb.group({
        indentDAta: this.fb.group({
          indentId: [this.indentId]
        }),
        userListData: this.fb.group({
          id: [this.role_idMain]
        }),
        listOfpO: []
      })
      let dd = [];

      for (let j = 0; j < aa.length; j++) {
        let bb = this.fb.group({
          price_id: [aa[j].price_Id]
        });
        dd.push(bb.value);
        cc.get('listOfpO').setValue(dd);
      }

      if (cc.get('listOfpO').value != null) {
        console.warn(cc.value);
        this.post.createPo(cc.value).subscribe((data: any) => {
          
        })
      }

    }
    this.ref.close();
  }
}
