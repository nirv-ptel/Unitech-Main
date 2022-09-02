import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  ItemVenderSorce: any = [];

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
    })

    let result = this.ItemVenderSorce.filter(p => p.itemModelPrice.itemName == p);
    console.warn(result);
  }


}
