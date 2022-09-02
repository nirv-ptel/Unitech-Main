import { DatePipe } from "@angular/common";
import { identifierModuleUrl } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { LoginService } from "../../../@service/auth/login.service";
import { MachineService } from "../../../@service/machine/machine.service";
import { IssueService } from "../../../@service/store/issue.service";
import { ItemService } from "../../../@service/store/item.service";

@Component({
  selector: "ngx-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
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

  DepartmentIndent: any;
  IndentForm: FormGroup;
  TwoDate: FormGroup;
  TwoDateItem: FormGroup;
  item: any;

  Source: any = [];
  SourceFilter: any = [];
  SourceItemFilter: any = [];
  MachineName: any = [];

  settings = {
    actions: false,
    columns: {
      issueId: {
        title: "ID",
        type: "number",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.issueId;
        },
      },
      description: {
        title: "Description",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.description;
        },
      },
      storeItemModel: {
        title: "Item Name",
        type: "string",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.storeItemModel.itemName;
        },
      },
      quantity: {
        title: "Quantity",
        type: "number",
        valuePrepareFunction: (cell, row) => {
          return row.issuedItem.quantity;
        },
      },
      // requiredDays: {
      //   title: "Required Days",
      //   type: "number",
      // },
      issueDate: {
        title: "Issue Date",
        type: "date",
        valuePrepareFunction: (cell, row) => {
          return new Date(row.issuedItem.issueDate).toLocaleString("en-IN");
        },
      },
      status: {
        title: "Status",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            '<span class="cell_right1">' + row.issuedItem.status + "</span>"
          );
        },
      },
    },
  };
  settingsItemDate = {
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
      // requiredDays: {
      //   title: "Required Days",
      //   type: "number",
      // },
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
          return '<span class="cell_right1">' + row.status + "</span>";
        },
      },
    },
  };

  constructor(
    private post: IssueService,
    private fb: FormBuilder,
    private _auth: LoginService,
    private machineName: MachineService,
    private postItem: ItemService,
  ) { }

  ngOnInit() {
    this.IndentForm = this.fb.group({
      departmentName: [null],
    });
    this.TwoDate = this.fb.group({
      deptname: [null, Validators.required],
      machineName: [null],
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
    this.TwoDateItem = this.fb.group({
      itemId: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, [Validators.required, Validators.max]],
    });
    this.post.ViewUsageItem().subscribe((data) => {
    });
    this.postItem.ViewItem().subscribe((data: any) => {
      this.item = data.Data;
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  chengeDepartmentName(event) {
    this.post.ViewDepartUsageItem(event).subscribe((data) => {
      this.Source = data.Data;
    });
  }

  onDateSubmit() {
    let start = this.TwoDate.get("start").value;
    let end = this.TwoDate.get("end").value;
    let deptname = this.TwoDate.get("deptname").value;
    let machineName = this.TwoDate.get("machineName").value;
    if (
      start != null &&
      end != null &&
      deptname != null &&
      machineName == null
    ) {
      this.post
        .ViewFilterUsageItem(deptname, start, end)
        .subscribe((data: any) => {
          this.SourceFilter = data.Data;
        });
    } else {
      this.post
        .ViewFilterUsageItemId(deptname, start, end, machineName)
        .subscribe((data: any) => {
          this.SourceFilter = data.Data;
        });
    }
  }

  onDateItemSubmit() {
    let start = this.TwoDateItem.get("start").value;
    let end = this.TwoDateItem.get("end").value;
    let itemId = this.TwoDateItem.get("itemId").value;
    if (start != null && end != null && itemId != null) {
      this.post.ItemDateIssue(start, end, itemId).subscribe((data: any) => {
        this.SourceItemFilter = data.Data;
      });
    }
  }

  chengeDepartmentName1(event) {
    this.TwoDate.get("machineName").setValue(null);
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
}
