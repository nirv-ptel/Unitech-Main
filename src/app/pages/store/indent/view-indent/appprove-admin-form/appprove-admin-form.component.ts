import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LoginService } from '../../../../../@service/auth/login.service';
import { IndentService } from '../../../../../@service/store/indent.service';
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
  VenderId: any = [];

  @Input() indentId: number;

  constructor(
    protected ref: NbDialogRef<AppproveAdminFormComponent>,
    private _auth: LoginService,
    private _user: UserService,
    private fb: FormBuilder,
    private post: IndentService
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
      console.warn(this.ItemVenderSorce);
    })
    this.post.ViewVenderByIdItemId(this.indentId).subscribe((data: any) => {
      this.ItemId = data.Data;
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
      this.AddRow();
    }
  }
  AddRow() {
    this.Arow.push(this.AddCol());
    for (let i = 0; i < this.ItemId.length; i++) {
      this.BCol(this.Arow.length - 1).push(this.AddRows(this.ItemId[i]));
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

  AddRows(event: any) {
    return this.fb.group({
      item: [null, Validators.required],
      Vender: [event, Validators.required]
    })
  }


}
