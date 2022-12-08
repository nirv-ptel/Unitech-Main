import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoginService } from "../../../@service/auth/login.service";
import { MachineService } from "../../../@service/machine/machine.service";
import { apiUrl } from "../../../@service/service";
import { CategoryService } from "../../../@service/store/category.service";
import { IssueService } from "../../../@service/store/issue.service";
import { ItemService } from "../../../@service/store/item.service";
import { UnitService } from "../../../@service/store/unit.service";

@Component({
  selector: "ngx-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  AddStockFormView: boolean = false;

  category: any;
  unit: any;
  item: any;

  NbDialogRef: any;

  ItemForm: FormGroup;
  ItemFormUpdate: FormGroup;
  AddStockForm: FormGroup;
  UploadItemForm: FormGroup;
  IssueForm: FormGroup;
  usageItemForm: FormGroup;

  oldquantity: number;
  total: number;

  settings = {
    actions: 
    {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          title: '<i class="nb-edit" title="Edit"></i>',
        }],
      position: 'right'
    },

    columns: {
      itemId: {
        title: "ID",
        type: "number",
      },
      itemName: {
        title: "Item Name",
        type: "number",
      },
      itemDescription: {
        title: "Item Description",
        type: "number",
      },
      catalogNo: {
        title: "Catalog No",
        type: "number",
      },
      drawingNo: {
        title: "Drawing No",
        type: "number",
      },
      frequency: {
        title: "Purchase Time Limit",
        type: "number",
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },

      activation: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          if (cell == true) {
            return '<span class="cell_right1">Active</span>';
          }
          if (cell == false) {
            return '<span class="cell_right">Deactive</span>';
          }
        },
      },
    },
  };
  settingRead = {
    actions: false,

    columns: {
      itemId: {
        title: "ID",
        type: "number",
      },
      itemName: {
        title: "Item Name",
        type: "number",
      },
      itemDescription: {
        title: "Item Description",
        type: "number",
      },
      catalogNo: {
        title: "Catalog No",
        type: "number",
      },
      drawingNo: {
        title: "Drawing No",
        type: "number",
      },
      frequency: {
        title: "Purchase Time Limit",
        type: "number",
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },

      activation: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          if (cell == true) {
            return '<span class="cell_right1">Active</span>';
          }
          if (cell == false) {
            return '<span class="cell_right">Deactive</span>';
          }
        },
      },
    },
  };
  settingsMain = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: "Button",
          title: '<i class="nb-edit" title="Create Issue"></i>',
        },
      ],
      position: "right",
    },
    columns: {
      itemId: {
        title: "ID",
        type: "number",
      },
      itemName: {
        title: "Item Name",
        type: "number",
      },
      itemDescription: {
        title: "Item Description",
        type: "number",
      },
      catalogNo: {
        title: "Catalog No",
        type: "number",
      },
      drawingNo: {
        title: "Drawing No",
        type: "number",
      },
      frequency: {
        title: "Purchase Time Limit",
        type: "number",
      },
      quantity: {
        title: "Quantity",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          if (cell >= 0) {
            return '<span class="cell_right1">Available</span>';
          } else {
            return '<span class="cell_right">Not Available</span>';
          }
        },
      },
    },
  };
  fileName = "";
  uploadProgress: number;
  uploadSub: Subscription;

  deptName: any = [
    "bloowroom",
    "carding",
    "drawframe",
    "finisher",
    "speedframe",
    "comber",
    "lapformer",
    "ringframe",
    "winding",
    "packing",
    "utility",
    "wasteroom",
  ];
  MachineName: any = [];

  key: string = 'created';
  reverse: boolean = false;
  FilterOnOff: boolean = false;
  SearchField: any = null;
  page: number = 1;
  itemsPerPage = 5;
  totalItems: any;
  FilterForm: FormGroup;

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private postCategory: CategoryService,
    private _auth: LoginService,
    private post: IssueService,
    private postUnit: UnitService,
    private postItem: ItemService,
    private http: HttpClient,
    private machineName: MachineService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit() {
    // role find ------------------------------------
    let role = this._auth.user.roles.find((x) => x);
    let role_id = this._auth.user.userId;
    if (role == "ROLE_ADMIN") {
      this.admin = true;
    } else if (role == "ROLE_MAINTENANCE") {
      this.maintanance = true;
    } else if (role == "ROLE_STORE") {
      this.store = true;
    } else if (role == "ROLE_GENERALMANAGER") {
      this.gm = true;
    }
//  form -------------------------------------
    this.ItemForm = this.fb.group({
      itemName: ["", Validators.required],
      productCategory: this.fb.group({
        pid: ["", Validators.required],
      }),
      unit: this.fb.group({
        uid: ["", Validators.required],
      }),
      itemDescription: [null],
      drawingNo: [null, Validators.required],
      catalogNo: [null, Validators.required],
      frequency: [null, Validators.required],
      remainingItem: [null],
      quantity: [null],
      expiryDate: [null],
      paytax: [null, Validators.required],
      activation: [true],
      employe: this.fb.group({
        id: [role_id],
      }),
    });

    this.ItemFormUpdate = this.fb.group({
      itemId:[null, Validators.required],
      itemName: ["", Validators.required],
      productCategory: this.fb.group({
        pid: ["", Validators.required],
      }),
      unit: this.fb.group({
        uid: ["", Validators.required],
      }),
      itemDescription: [null],
      drawingNo: [null, Validators.required],
      catalogNo: [null, Validators.required],
      frequency: [null, Validators.required],
      remainingItem: [null],
      expiryDays: [null],
      paytax: [null, Validators.required],
      activation: [true],
      employe: this.fb.group({
        id: [role_id],
      }),
    });

    this.AddStockForm = this.fb.group({
      itemId: [null, Validators.required],
      quantity: [null, Validators.required],
    });

    this.UploadItemForm = this.fb.group({
      file: [null, Validators.required],
    });

    this.IssueForm = this.fb.group({
      quantity: [null, Validators.required],
      description: [null, Validators.required],
      isRaised: [false],
      requiredDays: [null],
      storeItemModel: this.fb.group({
        itemId: [null, Validators.required],
      }),
      emp: this.fb.group({
        id: [role_id, Validators.required],
      }),
      deptName: [null, Validators.required],
      machineName: [null, Validators.required],
    });

    this.usageItemForm = this.fb.group({
      deptName: [null],
      issuedItem: this.fb.group({
        issueId: [null],
      }),
    });

    this.FilterForm = this.fb.group({
      page: [null],
      size: [null]
    })

    this.postCategory.ViewCategory().subscribe((data) => {
      this.category = data.Data;
    });

    this.postUnit.ViewUnit().subscribe((data) => {
      this.unit = data.Data;
    });

    this.ViewItemPage(1);
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 190 && event.which != 46 && event.which != 37 && event.which != 39)) {
      event.preventDefault();
    }
  }

  onItemFormSubmit() {
    this.postItem.CreateItem(this.ItemForm.value).subscribe((data: any) => {
      this.allAlert('success', `${data.Data.itemName} Created !`, 'Successfully Create Item');
      this.ItemForm.reset();
      this.ngOnInit();
    }, (error: any) => {
      this.allAlert('danger', `Not Created !`, `${error.error.message}`);
    });
  }

  ViewItemGet(event) {
    this.postItem.FindByIdItem(event).subscribe((data: any) => {
      this.oldquantity = data.Data.quantity;
      this.AddStockFormView = true;
    });
  }

  onIssueFormSubmit() {

    let deptName = this.IssueForm.value.deptName;
    this.usageItemForm.get("deptName").setValue(deptName);

    if (deptName == "bloowroom") {
      this.usageItemForm.addControl(
        "bloowusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "carding") {
      this.usageItemForm.addControl(
        "cardingusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "comber") {
      this.usageItemForm.addControl(
        "comberusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "lapformer") {
      this.usageItemForm.addControl(
        "lapFormerusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "drawframe") {
      this.usageItemForm.addControl(
        "drawFramesMachine",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "finisher") {
      this.usageItemForm.addControl(
        "finisherMachinedata",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "packing") {
      this.usageItemForm.addControl(
        "packingMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "ringframe") {
      this.usageItemForm.addControl(
        "ringframeMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "speedframe") {
      this.usageItemForm.addControl(
        "simplexMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "utility") {
      this.usageItemForm.addControl(
        "utilliyMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "wasteroom") {
      this.usageItemForm.addControl(
        "wasteMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    } else if (deptName == "winding") {
      this.usageItemForm.addControl(
        "windingMachineusage",
        this.fb.group({
          id: [this.IssueForm.value.machineName],
        })
      );
    }

    this.post.CreateIssue(this.IssueForm.value).subscribe((data: any) => {
      this.usageItemForm
        .get("issuedItem")
        .get("issueId")
        .setValue(data.Data.issueId);

      this.post
        .CreateUsageItem(this.usageItemForm.value)
        .subscribe((data: any) => {
          this.allAlert('success', `Issue Created !`, 'Successfully Create Issue');
          this.IssueForm.reset();
          this.NbDialogRef.close();
          this.ngOnInit();
        }, (error: any) => {
          this.allAlert('danger', `Not Created !`, `${error.error.message}`);
        });
    }, (error: any) => {
      this.allAlert('danger', `Not Created !`, `${error.error.message}`);
    });
  }

  chengeDepartmentName(event) {
    this.IssueForm.get("machineName").setValue(null);
    if (event == "bloowroom") {
      this.machineName.ViewAllBloowRoom().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "carding") {
      this.machineName.ViewAllCarding().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "drawframe") {
      this.machineName.ViewAllDrawframes().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "finisher") {
      this.machineName.ViewAllFinisher().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "speedframe") {
      this.machineName.ViewAllSimplex().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "comber") {
      this.machineName.ViewAllCombers().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "lapformer") {
      this.machineName.ViewAllLapformer().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "ringframe") {
      this.machineName.ViewAllRingframe().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "winding") {
      this.machineName.ViewAllWinding().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "packing") {
      this.machineName.ViewAllPacking().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "utility") {
      this.machineName.ViewAllUtility().subscribe((data: any) => {
        this.MachineName = data;
      });
    } else if (event == "wasteroom") {
      this.machineName.ViewAllWasteroom().subscribe((data: any) => {
        this.MachineName = data;
      });
    }
  }

  keyFunc(event) {
    this.total =
      parseInt(event.explicitOriginalTarget.value) + this.oldquantity;
  }

  onStockUpdateFormSubmit() {
    this.postItem
      .StockUpdateItem(
        this.AddStockForm.value.itemId,
        this.AddStockForm.value.quantity
      )
      .subscribe((data: any) => {
        this.ngOnInit();
        this.AddStockFormView = false;
      });
  }

  createIssue(event, dialog) {
    this.IssueForm.get("storeItemModel").get("itemId").setValue(event.itemId);
    this.NbDialogRef = this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
    });
  }
  EditItem(event, dialog) {
    this.ItemFormUpdate.get('productCategory').get('pid').setValue(event.productCategory.pid);
    this.ItemFormUpdate.get('unit').get('uid').setValue(event.unit.uid);
    this.ItemFormUpdate.get('itemName').setValue(event.itemName);
    this.ItemFormUpdate.get('itemDescription').setValue(event.itemDescription);
    this.ItemFormUpdate.get('drawingNo').setValue(event.drawingNo);
    this.ItemFormUpdate.get('catalogNo').setValue(event.catalogNo);
    this.ItemFormUpdate.get('frequency').setValue(event.frequency);
    this.ItemFormUpdate.get('remainingItem').setValue(event.remainingItem);
    this.ItemFormUpdate.get('expiryDays').setValue(event.expiryDays);
    this.ItemFormUpdate.get('paytax').setValue(event.paytax);
    this.ItemFormUpdate.get('activation').setValue(event.activation);
    this.ItemFormUpdate.get('itemId').setValue(event.itemId);

    this.NbDialogRef = this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
    });
  }

  onUpdateItem() {
    let itemID = this.ItemFormUpdate.value.itemId;
    this.ItemFormUpdate.removeControl('itemId');
    this.postItem.UpdateItem(this.ItemFormUpdate.value, itemID).subscribe((data: any) => {
      this.allAlert('success', `${data.Data.itemName} Updated !`, 'Successfully Item Updated');
      this.ItemForm.reset();
      this.NbDialogRef.close();
      this.ngOnInit();
    }, (error: any) => {
      this.allAlert('danger', `Not Updated !`, `${error.error.message}`);
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.UploadItemForm.get("file").setValue(file);
    } else {
      this.UploadItemForm.get("file").setValue(null);
    }
  }

  onUploadItemFormSubmit() {
    const formData = new FormData();
    formData.append("file", this.UploadItemForm.value.file);
    this.postItem.ItemUpload(formData).subscribe(
      (data: any) => {
        this.allAlert('success', `File Upload !`, 'Successfully Upload File');
      },
      (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      }
    );
  }

  FilterClear() {
    this.SearchField = null;
    this.ngOnInit();
  }

  FilterOn() {
    this.FilterOnOff = !this.FilterOnOff;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  AddFilterForm() {
    this.FilterForm.addControl('filters', this.fb.array([
      this.fb.group({
        key: [null],
        operator: [null],
        field_type: [null],
        value: [null],
        value_to: [null]
      })
    ]))
  }

  FilterDone() {

    this.AddFilterForm();
    this.FilterForm.value.filters[0].key = 'itemName';
    this.FilterForm.value.filters[0].operator = 'LIKE';
    this.FilterForm.value.filters[0].field_type = 'STRING';
    this.FilterForm.value.filters[0].value = this.SearchField;
    this.FilterForm.value.filters[0].value_to = null;

    this.FilterForm.get('page').setValue(0);
    this.FilterForm.get('size').setValue(this.itemsPerPage);
    this.postItem.FilterGetAllItem(this.FilterForm.value).subscribe((data: any) => {
      this.item = data.content;
      this.page = data.number;
      this.totalItems = data.totalElements;
    })
  }

  ViewItemPage(pages: number) {
    this.item = null;
    this.FilterForm.get('page').setValue(pages-1);
    this.FilterForm.get('size').setValue(this.itemsPerPage);
     
    this.postItem.FilterGetAllItem(this.FilterForm.value).subscribe((data: any) => {
      this.item = data.content;
      this.page = pages;
      this.totalItems = data.totalElements;
    })

  }

  refreshCountries() {
    this.ViewItemPage(1);
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
