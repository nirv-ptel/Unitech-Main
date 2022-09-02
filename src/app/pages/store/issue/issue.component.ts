import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { concat } from "rxjs";
import { LoginService } from "../../../@service/auth/login.service";
import { MachineService } from "../../../@service/machine/machine.service";
import { IndentService } from "../../../@service/store/indent.service";
import { IssueService } from "../../../@service/store/issue.service";
import { ItemService } from "../../../@service/store/item.service";
import { ResponceService } from "../../../@service/store/responce.service";

@Component({
  selector: "ngx-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.scss"],
})
export class IssueComponent implements OnInit {
  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;

  IssueForm: FormGroup;
  IssueOpenForm: FormGroup;
  ResponceForm: FormGroup;
  ResponceFormIndent: FormGroup;
  IndentForm: FormGroup;
  usageItemForm: FormGroup;

  NbDialogRef: any;
  NbDialogRef1: any;
  NbDialogRef2: any;
  NbDialogRef3: any;

  statusChangeIssue: any;
  item: any;
  IssueSource: any = [];
  PENDINGIssueSource: any = [];
  ACCEPTIssueSource: any = [];
  DONEIssueSource: any = [];
  REJECTIssueSource: any = [];
  CANCELIssueSource: any = [];
  OPENIssueSource: any = [];

  tax: any;
  total: any;
  DataTransferVender = [];
  basicAmmount: number;

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

  PENDINGsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: "Button",
          type: "html",
          title: '<i class="nb-list" title="View"></i>',
        },
      ],
      position: "right",
    },
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  ACCEPTsettings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  DONEsettings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  REJECTsettings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  CANCELsettings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  OPENsettings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };
  OPENsettingsMain = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: "Button",
          type: "html",
          title: '<i class="nb-list" title="View"></i>',
        },
      ],
      position: "right",
    },
    columns: {
      issueId: {
        title: "ID",
        type: "number",
      },
      description: {
        title: "Description",
        type: "string",
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
      },
      requiredDays: {
        title: "Required Days",
        type: "number",
      },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + "</span>";
        },
      },
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private _auth: LoginService,
    private post: IssueService,
    private postIndent: IndentService,
    private postItem: ItemService,
    private postResponce: ResponceService,
    private machineName: MachineService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
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

    this.postResponce.ViewResponce().subscribe((data: any) => { });

    this.IssueForm = this.fb.group({
      quantity: [null, Validators.required],
      description: [null, Validators.required],
      isRaised: [false],
      requiredDays: [null, Validators.required],
      storeItemModel: this.fb.group({
        itemId: [null, Validators.required],
      }),
      emp: this.fb.group({
        id: [role_id, Validators.required],
      }),
      deptName: [null, Validators.required],
      machineName: [null, Validators.required],
    });
    this.IssueOpenForm = this.fb.group({
      quantity: [null, Validators.required],
      coments: [null, Validators.required],
      remarks: [null],
      issueId: [null, Validators.required],
    });

    this.ResponceForm = this.fb.group({
      resStatus: ["ISSUE"],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [false],
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id],
      }),
    });

    this.IndentForm = this.fb.group({
      storeItem: this.fb.group({
        itemId: [null, Validators.required],
      }),
      employee: this.fb.group({
        id: [role_id],
      }),
      issue: this.fb.group({
        issueId: [null, Validators.required],
      }),
      quantity: [null, Validators.required],
      estimatedPrice: [null, Validators.required],
      venderAdd: [null]
    });

    this.ResponceFormIndent = this.fb.group({
      resStatus: ["INDENT"],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [true],
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id],
      }),
    });

    this.usageItemForm = this.fb.group({
      deptName: [null],
      issuedItem: this.fb.group({
        issueId: [null],
      }),
    });

    this.postItem.ViewItem().subscribe((data) => {
      this.item = data.Data;
    });
    this.post.ViewIssue().subscribe((data) => {
      this.IssueSource = data.Data;
    });

    this.post.ViewIssueStatus("PENDING").subscribe((data) => {
      this.PENDINGIssueSource = data.Data;
    });
    this.post.ViewIssueStatus("ACCEPT").subscribe((data) => {
      this.ACCEPTIssueSource = data.Data;
    });
    this.post.ViewIssueStatus("DONE").subscribe((data) => {
      this.DONEIssueSource = data.Data;
    });
    this.post.ViewIssueStatus("REJECT").subscribe((data) => {
      this.REJECTIssueSource = data.Data;
    });
    this.post.ViewIssueStatus("CANCEL").subscribe((data) => {
      this.CANCELIssueSource = data.Data;
    });
    this.post.ViewIssueStatus("OPEN").subscribe((data) => {
      this.OPENIssueSource = data.Data;
    });
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 190 && event.which != 46 && event.which != 37 && event.which != 39)) {
      event.preventDefault();
    }
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

  createIssue(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
      hasScroll: true
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

  onChangeIssueStatus(event, dialog1) {
    this.statusChangeIssue = null;
    this.statusChangeIssue = event;
    this.IssueOpenForm.get("quantity").setValue(event.quantity);
    this.IssueOpenForm.get("issueId").setValue(event.issueId);
    this.NbDialogRef1 = this.dialogService.open(dialog1, {
      closeOnBackdropClick: false,
      hasScroll: true
    });
  }

  onChangeIssueCloseStatus(event, dialog2) {
    this.statusChangeIssue = null;
    this.statusChangeIssue = event;
    this.IssueOpenForm.get("quantity").setValue(event.quantity);
    this.IssueOpenForm.get("issueId").setValue(event.issueId);
    this.NbDialogRef2 = this.dialogService.open(dialog2, {
      closeOnBackdropClick: false,
      hasScroll: true
    });
  }

  issueOpen() {
    let Opendata = {
      quantity: this.IssueOpenForm.value.quantity,
      status: "DONE",
    };
    this.post
      .StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata)
      .subscribe((data: any) => {
        this.ResponceForm.get("coments").setValue(
          this.IssueOpenForm.value.coments
        );
        this.ResponceForm.get("remarks").setValue(
          this.IssueOpenForm.value.remarks
        );
        this.ResponceForm.get("issueStatus").setValue("PENDING");
        this.ResponceForm.get("pdiId").setValue(
          this.IssueOpenForm.value.issueId
        );
        this.postResponce
          .CreateResponce(this.ResponceForm.value)
          .subscribe((data: any) => {
            this.allAlert('success', `Issue Approved !`, 'Successfully Issue Approved');
            this.NbDialogRef1.close();
            this.ngOnInit();
          }, (error: any) => {
            this.allAlert('danger', `Not Created !`, `${error.error.message}`);
          });
      }, (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      });
  }

  issueReject() {
    let Opendata = {
      quantity: this.IssueOpenForm.value.quantity,
      status: "REJECT",
    };
    this.post
      .StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata)
      .subscribe((data: any) => {
        this.ResponceForm.get("coments").setValue(
          this.IssueOpenForm.value.coments
        );
        this.ResponceForm.get("remarks").setValue(
          this.IssueOpenForm.value.remarks
        );
        this.ResponceForm.get("issueStatus").setValue("PENDING");
        this.ResponceForm.get("pdiId").setValue(
          this.IssueOpenForm.value.issueId
        );
        this.postResponce
          .CreateResponce(this.ResponceForm.value)
          .subscribe((data: any) => {
            this.allAlert('success', `Issue Rejected !`, 'Successfully Issue Rejected');
            this.NbDialogRef1.close();
            this.ngOnInit();
          }, (error: any) => {
            this.allAlert('danger', `Not Created !`, `${error.error.message}`);
          });
      }, (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      });
  }

  issueCancel() {
    let Opendata = {
      quantity: this.IssueOpenForm.value.quantity,
      status: "CANCEL",
    };
    this.post
      .StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata)
      .subscribe((data: any) => {
        this.ResponceForm.get("coments").setValue(
          this.IssueOpenForm.value.coments
        );
        this.ResponceForm.get("remarks").setValue(
          this.IssueOpenForm.value.remarks
        );
        this.ResponceForm.get("issueStatus").setValue("PENDING");
        this.ResponceForm.get("pdiId").setValue(
          this.IssueOpenForm.value.issueId
        );
        this.postResponce
          .CreateResponce(this.ResponceForm.value)
          .subscribe((data: any) => {
            this.allAlert('success', `Issue Canceled !`, 'Successfully Issue Canceled');
            this.NbDialogRef1.close();
            this.ngOnInit();
          }, (error: any) => {
            this.allAlert('danger', `Not Created !`, `${error.error.message}`);
          });
      }, (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      });
  }

  issueClose() {
    let Opendata = {
      quantity: this.IssueOpenForm.value.quantity,
      status: "DONE",
    };
    this.post
      .StatusUpdateIssue(this.IssueOpenForm.value.issueId, Opendata)
      .subscribe((data: any) => {
        this.ResponceForm.get("coments").setValue(
          this.IssueOpenForm.value.coments
        );
        this.ResponceForm.get("remarks").setValue(
          this.IssueOpenForm.value.remarks
        );
        this.ResponceForm.get("issueStatus").setValue("OPEN");
        this.ResponceForm.get("pdiId").setValue(
          this.IssueOpenForm.value.issueId
        );
        this.postResponce
          .CreateResponce(this.ResponceForm.value)
          .subscribe((data: any) => {
            this.allAlert('success', `Issue Approved !`, 'Successfully Issue Approved');
            this.NbDialogRef2.close();
            this.ngOnInit();
          }, (error: any) => {
            this.allAlert('danger', `Not Created !`, `${error.error.message}`);
          });
      }, (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      });
  }

  IndentCreate(dialog3: TemplateRef<any>) {
    // this.total = null;
    this.tax = this.statusChangeIssue.storeItemModel.paytax;
    this.IndentForm.get("storeItem")
      .get("itemId")
      .setValue(this.statusChangeIssue.storeItemModel.itemId);
    this.IndentForm.get("issue")
      .get("issueId")
      .setValue(this.statusChangeIssue.issueId);
    this.IndentForm.get("quantity").setValue(this.statusChangeIssue.quantity);
    this.NbDialogRef1.close();
    this.NbDialogRef3 = this.dialogService.open(dialog3, {
      closeOnBackdropClick: false,
    });
  }

  taxToatal(event) {
    let price = event.target.value;
    let quantity = this.IndentForm.value.quantity;
    if (this.tax != null && price != null && quantity != null) {
      this.basicAmmount = quantity * price;
      this.total = (quantity * price * this.tax) / 100 + quantity * price;
    }
  }
  taxToatalQantity(event) {
    let price = this.IndentForm.value.estimatedPrice;
    let quantity = event.target.value;
    if (this.tax != null && price != null && quantity != null) {
      this.basicAmmount = quantity * price;
      this.total = (quantity * price * this.tax) / 100 + quantity * price;
    }
  }

  changeVender(event) {
    this.DataTransferVender.length = 0;
    for (let i = 0; i < event.length; i++) {
      this.DataTransferVender.push({ 'id': event[i] });
    }
  }

  onIndentFormSubmit() {
    this.IndentForm.removeControl('venderAdd');
    this.IndentForm.addControl('dataVendorAndIndent', this.fb.control(this.DataTransferVender));
    this.postIndent
      .CreateIndent(this.IndentForm.value)
      .subscribe((data: any) => {
        this.ResponceFormIndent.get("coments").setValue("create indent");
        this.ResponceFormIndent.get("remarks").setValue("create indent");
        this.ResponceFormIndent.get("pdiId").setValue(data.Data.indentId);
        this.postResponce
          .CreateResponce(this.ResponceFormIndent.value)
          .subscribe((data: any) => {
            this.allAlert('success', `Indent Created !`, 'Successfully Indent Created');
            this.NbDialogRef3.close();
            this.ngOnInit();
          }, (error: any) => {
            this.allAlert('danger', `Not Created !`, `${error.error.message}`);
          });
      }, (error: any) => {
    this.ngOnInit();
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
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
