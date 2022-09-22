import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LoginService } from '../../../../@service/auth/login.service';
import { IndentService } from '../../../../@service/store/indent.service';

@Component({
  selector: 'ngx-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.scss']
})
export class PoDetailsComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;
  role_idMain: number;

  poSource: any = [];
  PoDetailsName = {
    PoId: null,
    PoTotal: null,
    PoDate:null
  }

  constructor(
    protected ref: NbDialogRef<PoDetailsComponent>,
    private _auth: LoginService,
    private _indent: IndentService
  ) { }

  @Input() poID: number;

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

    this._indent.ViewPoById(this.poID).subscribe((data: any) => {
      this.poSource = data.Data.listOfpO;
      this.PoDetailsName.PoId = data.Data.poNumber;
    })
  }


  dismiss() {
    this.ref.close();
  }
}
