import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { UnitService } from '../../../@service/store/unit.service';

@Component({
  selector: 'ngx-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.scss']
})
export class ProductUnitComponent implements OnInit {

  UnitForm: FormGroup;

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  source: any = [];

  NbDialogRef = null;

  settings = {
    actions: false,
    columns: {
      uid: {
        title: 'ID',
        type: 'number',
      },
      unitName: {
        title: 'Product Unit',
        type: 'string',
      },
    },
  };


  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private _auth: LoginService,
    private post: UnitService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {

    let role = this._auth.user.roles.find((x => x));
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_MAINTENANCE') {
      this.maintanance = true;
    } else if (role == 'ROLE_STORE') {
      this.store = true;
    } else if (role == 'ROLE_GENERALMANAGER') {
      this.gm = true;
    }

    this.UnitForm = this.fb.group({
      unitName: ['', Validators.required],
    })
    this.post.ViewUnit().subscribe(data => {
      this.source = data.Data;
    });

  }

  addUnit(dialog: TemplateRef<any>) {
    this.UnitForm.reset();
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onUnitFormSubmit() {
    this.post.CreateUnit(this.UnitForm.value).subscribe((data: any) => {
      this.UnitForm.reset();
      this.allAlert('success', `${data.Data.unitName} Created !`, 'Successfully Create Unit');
      this.NbDialogRef.close();
      this.ngOnInit();
    },
      (error: Error) => {
        this.allAlert('danger', `Not Created !`, `something wrong`);
      });
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
