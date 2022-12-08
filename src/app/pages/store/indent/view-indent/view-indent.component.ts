import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../../../@service/auth/login.service';
import { IndentService } from '../../../../@service/store/indent.service';
import { NbDialogRef } from '@nebular/theme';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../@service/user/user.service';
import { IndentComponent } from '../indent.component';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';

@Component({
  selector: 'ngx-view-indent',
  templateUrl: './view-indent.component.html',
  styleUrls: ['./view-indent.component.scss']
})
export class ViewIndentComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  role_idMain: number;
  role_usernameMain: string;

  indentFormApprovel: boolean = false;
  indentFormApprovelStore: boolean = false;
  indentFormApprovelLast: boolean = false;

  IndentDetailsName = {
    IndentId: null,
    IndentNumber:null,
    IndentDate: null,
    indentStatus: null,
    IndentTotal: null,
    IndentTaxTotal: null,
    IndentStatus: null
  }

  ItemSource: any = [];
  VenderSource: any = [];
  ItemVenderSorce: any = [];
  ApproveRecord: any = [];

  price: any = [];

  IndentSatatusChange: FormGroup;

  @Input() indentId: number;



  Itemsettings = {
    actions: false,

    columns: {
      storeItemIndentQuantityData: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemIndentQuantityData.itemName
        },
        filter: false
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
        filter: false
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
        filter: false
      },
      paytax: {
        title: 'Item Tax (%)',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItemIndentQuantityData.paytax
        },
        filter: false
      },
      withoutTax: {
        title: 'Basic Ammount',
        type: 'number',
        filter: false
      },
      total: {
        title: 'Total Ammount',
        type: 'number',
        filter: false
      }
    },
  };

  Appovelsettings = {
    actions: false,

    columns: {

      indentNumber: {
        title: 'Indent Number',
        type: 'number',
        filter: false
      },
      userName: {
        title: 'Username',
        type: 'string',
        filter: false
      },

      comment: {
        title: 'Comment',
        type: 'string',
        filter: false
      },
      timeStamp: {
        title: 'Date Time',
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
        filter: false
      }
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    protected ref: NbDialogRef<ViewIndentComponent>,
    private _auth: LoginService,
    private _user: UserService,
    private fb: FormBuilder,
    private post: IndentService,
    private _location: Location,
    private _vender: VenderService,
    private _router: Router
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

    this.post.IndentFindById(this.indentId).subscribe((data: any) => {
      this.IndentDetailsName.IndentId = data.Data.indentId;
      this.IndentDetailsName.IndentNumber = data.Data.indentNumber;
      this.IndentDetailsName.IndentDate = data.Data.createdDate;
      this.IndentDetailsName.indentStatus = data.Data.indentStatus;
      this.IndentDetailsName.IndentTotal = data.Data.total;
      this.IndentDetailsName.IndentTaxTotal = data.Data.includingTax;
      let id = data.Data.indentId;
      this.ItemSource = data.Data.indentQuantityList;

      if (id == null) {
        this.ref.close();
      }
      this.approveldesign();
    }, (error: any) => {
      this.ref.close();
    });

    this.IndentSatatusChange = this.fb.group({
      indentStatus: [null],
      comment: [null, Validators.required],
      employee: this.fb.group({
        id: [this.role_idMain],
      }),
    });

    this.post.ApprovelRecord(this.indentId).subscribe((data: any) => {
      this.ApproveRecord = data.Data;
    })

    this._vender.ViewVender().subscribe((data: any) => {
      this.VenderSource = data.Data;
    });

    this.post.ViewVenderById(this.indentId).subscribe((data: any) => {
      this.ItemVenderSorce = data.Data;
    })

    this._user.ViewUserProfile(this.role_idMain).subscribe(data => {
      this.role_usernameMain = data.username;
    })

    if (this.gm || this.admin || this.account || this.maintanance) {
      this.IndentSatatusChange.removeControl("indentQuantityList");
    }

  }

  approveldesign() {
    if (this.IndentDetailsName.indentStatus == "GM" && this.gm) {
      this.indentFormApprovel = true;
    } else if (this.IndentDetailsName.indentStatus == "ADMIN" && this.admin) {
      this.indentFormApprovel = true;
    } else if (this.IndentDetailsName.indentStatus == "STORE" && this.store) {
      this.indentFormApprovelStore = true;
    } else if (this.IndentDetailsName.indentStatus == "ACCOUNT" && this.account) {
      this.indentFormApprovel = true;
    } else if (this.IndentDetailsName.indentStatus == "ADMIN_LAST" && this.admin) {
      this.indentFormApprovelLast = true;
    }
  }

  ApprovedIndnet() {
    if (this.IndentDetailsName.indentStatus == "GM" && this.gm) {
      this.IndentSatatusChange.get('indentStatus').setValue('ADMIN');
    } else if (this.IndentDetailsName.indentStatus == "ADMIN" && this.admin) {
      this.IndentSatatusChange.get('indentStatus').setValue('STORE');
    } else if (this.IndentDetailsName.indentStatus == "STORE" && this.store) {
      this.IndentSatatusChange.get('indentStatus').setValue('ADMIN_LAST');
    } else if (this.IndentDetailsName.indentStatus == "ACCOUNT" && this.account) {
      
    } else if (this.IndentDetailsName.indentStatus == "ADMIN_LAST" && this.admin) {

    }
    this.post.StatusUpdateIndent(this.IndentDetailsName.IndentId, this.IndentSatatusChange.value).subscribe((data: any) => {
      this.ngOnInit();
      this.ref.close();
    });
  }

  ApprovedReject() {
    this.IndentSatatusChange.get('indentStatus').setValue('REJECT');
    this.post.StatusUpdateIndent(this.IndentDetailsName.IndentId, this.IndentSatatusChange.value).subscribe((data: any) => {
      this.ngOnInit();
      this.ref.close();
    });
  }

  backClicked() {
    this._location.back();
  }
  dismiss() {
    this.ref.close();
  }
}
