import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { LoginService } from "../../../@service/auth/login.service";
import { CategoryService } from "../../../@service/store/category.service";
import { UserService } from "../../../@service/user/user.service";

@Component({
  selector: "ngx-product-category",
  templateUrl: "./product-category.component.html",
  styleUrls: ["./product-category.component.scss"],
})
export class ProductCategoryComponent implements OnInit {
  source: any = [];
  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  settings = {
    actions: false,
  
    columns: {
      pid: {
        title: "ID",
        type: "number",
      },
      productName: {
        title: "Product Category",
        type: "string",
      },

    },
  };

  CategoryForm: FormGroup;
  NbDialogRef = null;

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private post: CategoryService,
    private _auth: LoginService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    // role find -------------------------
    let role = this._auth.user.roles.find((x) => x);
    if (role == "ROLE_ADMIN") {
      this.admin = true;
    } else if (role == "ROLE_MAINTENANCE") {
      this.maintanance = true;
    } else if (role == "ROLE_STORE") {
      this.store = true;
    } else if (role == "ROLE_GENERALMANAGER") {
      this.gm = true;
    }

    this.CategoryForm = this.fb.group({
      productName: ["", Validators.required],
    });

    this.post.ViewCategory().subscribe((data) => {
      this.source = data.Data;
    });
  }

  addCategory(dialog: TemplateRef<any>) {
    this.CategoryForm.reset();
    this.NbDialogRef = this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
    });
  }

  onCategoryFormSubmit() {
    this.post.CreateCategory(this.CategoryForm.value).subscribe((data: any) => {
      this.CategoryForm.reset();
      this.allAlert('success', `${data.Data.productName} Created !`, 'Successfully Create Category');
      this.NbDialogRef.close();
      this.ngOnInit();
    },
      (err: any) => {
        this.allAlert('danger', `Not Created !`, `${err.error.message}`);
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
