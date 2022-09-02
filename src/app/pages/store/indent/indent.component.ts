import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { VenderService } from '../../../@service/purchase/vender/vender.service';
import { IndentService } from '../../../@service/store/indent.service';
import { ItemService } from '../../../@service/store/item.service';
import { ResponceService } from '../../../@service/store/responce.service';
import { ViewIndentComponent } from './view-indent/view-indent.component';
import { concatMap, delay, delayWhen, map, tap } from "rxjs/operators";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.scss']
})
export class IndentComponent implements OnInit {

  // Role and UserID
  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;
  role_idMain: number;

  IndentSource: any = [];

  // Model View Indent
  NbDialogRef: any;

  // Pagination in Table
  page: number = 1;
  itemsPerPage = 5;
  totalItems: any;

  // Form Name


  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'Indent Number',
        type: 'number',
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };

  // NbDialogRef: any;
  // NbDialogRef1: any;
  // NbDialogRef2: any;
  // NbDialogRef3: any;

  // IndentForm: FormGroup;
  // IndentOpenForm: FormGroup;

  // ResponceForm: FormGroup;

  // statuschange: any;
  // item: any;
  // DataTransferVender = [];
  // vendorDate: [];
  // vendorDetails: [];
  // tax: any;
  // total: any;
  // basicAmmount: number;

  // ResponceSource: any = [];

  // VPIndentSource: any = [];
  // ADMINIndentSource: any = [];
  // ACCOUNTIndentSource: any = [];
  // REJECTIndentSource: any = [];
  // DONEIndentSource: any = [];

  // VPsettings = {
  //   actions: false,
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     // storeItem: {
  //     //   title: 'Item Name',
  //     //   type: 'string',
  //     //   valuePrepareFunction: (cell, row) => {
  //     //     return row.storeItem.itemName
  //     //   },
  //     // },
  //     // quantity: {
  //     //   title: 'Quantity',
  //     //   type: 'number',
  //     // },
  //     // estimatedPrice: {
  //     //   title: 'Estimated Price',
  //     //   type: 'number',
  //     // },
  //     // paytax: {
  //     //   title: 'Tax %',
  //     //   type: 'number',
  //     //   valuePrepareFunction: (cell, row) => {
  //     //     return row.storeItem.paytax
  //     //   },
  //     // },
  //     // total: {
  //     //   title: 'Basic Amount',
  //     //   type: 'number',
  //     // },
  //     // includingTax: {
  //     //   title: 'Total Amount',
  //     //   type: 'number',
  //     // },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // ADMINsettings = {
  //   actions: false,
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // VPONLYsettings = {
  //   actions: {
  //     delete: false,
  //     add: false,
  //     edit: false,
  //     custom: [
  //       {
  //         name: 'Button',
  //         type: 'html',
  //         title: '<i class="nb-list" title="View"></i>',
  //       }],
  //     position: 'right'
  //   },
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // ADMINONLYsettings = {
  //   actions: {
  //     delete: false,
  //     add: false,
  //     edit: false,
  //     custom: [
  //       {
  //         name: 'Button',
  //         type: 'html',
  //         title: '<i class="nb-list" title="View"></i>',
  //       }],
  //     position: 'right'
  //   },
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // ACCOUNTsettings = {
  //   actions: false,
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // ACCOUNTONLYsettings = {
  //   actions: {
  //     delete: false,
  //     add: false,
  //     edit: false,
  //     custom: [
  //       {
  //         name: 'Button',
  //         type: 'html',
  //         title: '<i class="nb-list" title="View"></i>',
  //       }],
  //     position: 'right'
  //   },
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // REJECTsettings = {
  //   actions: false,
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // DONEsettings = {
  //   actions: false,
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // settings = {
  //   actions: {
  //     delete: false,
  //     add: false,
  //     edit: false,
  //     custom: [
  //       {
  //         name: 'Button',
  //         type: 'html',
  //         title: '<i class="nb-list" title="View"></i>',
  //       }],
  //     position: 'right'
  //   },
  //   columns: {
  //     indentId: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     storeItem: {
  //       title: 'Item Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.itemName
  //       },
  //     },
  //     quantity: {
  //       title: 'Quantity',
  //       type: 'number',
  //     },
  //     estimatedPrice: {
  //       title: 'Estimated Price',
  //       type: 'number',
  //     },
  //     paytax: {
  //       title: 'Tax %',
  //       type: 'number',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.storeItem.paytax
  //       },
  //     },
  //     total: {
  //       title: 'Basic Amount',
  //       type: 'number',
  //     },
  //     includingTax: {
  //       title: 'Total Amount',
  //       type: 'number',
  //     },
  //     created: {
  //       title: 'Indent Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     indentStatus: {
  //       title: 'Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };
  // Responcesettings = {
  //   actions: false,
  //   columns: {
  //     rid: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     employe: {
  //       title: 'Employee Name',
  //       type: 'string',
  //       valuePrepareFunction: (cell, row) => {
  //         return row.employe.username
  //       },
  //     },
  //     coments: {
  //       title: 'Comments',
  //       type: 'string',
  //     },
  //     remarks: {
  //       title: 'Remarks',
  //       type: 'string',
  //     },
  //     created: {
  //       title: 'Indent Responce Date',
  //       type: 'date',
  //       valuePrepareFunction: (cell, row) => {
  //         return new Date(cell).toLocaleString('en-IN');
  //       },
  //     },
  //     issueStatus: {
  //       title: 'Indent Status',
  //       type: 'html',
  //       valuePrepareFunction: (cell, row) => {
  //         return '<span class="cell_right1">' + cell + '</span>';
  //       },
  //     }
  //   },
  // };

  constructor(
    private dialogService: NbDialogService,
    private _auth: LoginService,
    private fb: FormBuilder,
    private post: IndentService,
    private postItem: ItemService,
    private postResponce: ResponceService,
    private toastrService: NbToastrService,
    private _location: Location,
    private venderService: VenderService,
    private _router: Router
  ) {

    // this.ViewIndentPage(0);
  }

  ngOnInit(): void {
    // this.downloadAsPo();
    let role = this._auth.user.roles.find((x => x));
    let role_id = this._auth.user.userId;
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
    this.ViewIndentPage(1);

  }

  ViewIndentPage(pages: number) {
    this.IndentSource = null;
    this.post.ViewIndentPaginasion(pages - 1, this.itemsPerPage).subscribe(data => {
      this.IndentSource = data.Data;
      this.page = pages;
      this.totalItems = data.Pagination.rowcount;
    })
  }

  refreshCountries() {
    this.ViewIndentPage(1);
  }

  downloadAsPo() {
    let party = 111;
    let po_number = 222;
    let docDefinition = {
      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [
            {
              width: '20%',
              columns: [
                [
                  {
                    image: "data:image/png;base64,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"
                    , width: 100,
                    height: 55,
                  },

                ]
              ],
            },
            {
              width: '80%',
              columns: [
                [
                  {
                    width: 'auto',
                    text: 'UNITECH CONSPIN LIMITED',
                    bold: true,
                    fontSize: 16,
                  },
                  {
                    width: 'auto',
                    text: 'ADDRESS :- SURVEY NO 36-39, HIMMATPUR VILLAGE, HIMATNAGAR IDAR HIGHWAY, ',
                    bold: false,
                  },
                  {
                    width: 'auto',
                    text: '  HIMATPUR, TALUKA-IDAR, DIST-SABARKANTHA, GUJRAT-383010',
                    bold: false,
                    margin: [52, 0, 0, 0]
                  },
                  {
                    width: 'auto',
                    text: 'GST NO :-    24AAACU9349M1ZT.',
                    bold: false,
                    margin: [0, 5]
                  },
                ]

              ]
            },
          ],

        },
        {
          text: 'Purchase Order',
          alignment: 'center',
          margin: [0, 0, 0, 10],
          fontSize: 14,
          bold: true,
        },

        {
          columns: [
            {
              width: '50%',
              columns: [
                [
                  {
                    // width: '100%',
                    margin: [0, 3],
                    text: `Vendor Code       :- 111`,
                  },
                  {
                    // width: '100%',
                    margin: [0, 3],
                    text: `Vendor Name      :- abc`,
                  },
                  {
                    // width: '100%',
                    margin: [0, 3],
                    text: `Vendor Address  :- ahmedabad`,
                  },
                ]
              ],
            },
            {
              width: '50%',
              columns: [
                [
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `Indent No              :- 11`,
                  },
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `Delivery Number  :- 11`,
                  },
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `DO Date                 :- 11`,
                  },
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `PO Number           :- 11`,
                  },
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `PO Date                 :- 11`,
                  },
                  {
                    width: '100%',
                    margin: [0, 3],
                    text: `Delivery Address  :- ddd`,
                  },
                ]

              ]
            },
          ]
        },
        {
          width: 'auto',
          text: 'We request you to arrange delivery as per details mentioned below',
          alignment: 'center',
          margin: [0, 10]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                {
                  text: 'Item No.',
                },
                {
                  text: 'Item Name',
                },
                {
                  text: 'QTY',
                },
                {
                  text: 'Item Price',
                },
                {
                  text: 'Tax (%)',
                },
                {
                  text: 'Total',
                }],
              [`1212`,
                `abc acb abc abc abc abc abc`,
                `33`,
                `333`,
                `55`,
                `66`,
              ],
              [`1212`,
                `32`,
                `33`,
                `333`,
                `55`,
                `66`,
              ],
              [`Total`,
                ``,
                ``,
                ``,
                ``,
                `6546`,
              ]
            ],
          }
        },

        {
          text: 'Instructions',
          fontSize: 12,
          bold: true,
          margin: [0, 30, 0, 10]
        },
        {
          ul: [
            'Dedust Rs. 110/- per Candy as Trade Discount From The Sauda Rate /Deduct Rs 5000/- From Invoice amount directly and mention separately in the invoice',
            'Dedust Tare of 50 kgs and sample 8 kgs From the invoice Weight and mention separately in the invoice',
            'Truck Should not leave the premises without Final Invoice & Eway Bill.',
            'Landed Weight at destination will be Final',
            'Please Check the Truck Conditions and than Load The Truck, if found Demaged it will be Deducted from the Invoice.',
            'Every Bale Must have Sticker with Bale, Lot & PR Detail for identification of the Bales, if not found Rs. 50 Per bales will be deducted.'
          ],
        },
        {
          margin: [15, 15],
          columns: [
            [{ qr: `333`, fit: '100' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },

      ],
      defaultStyle: {
        fontSize: 10,

      }
    }
    pdfMake.createPdf(docDefinition).open();
  }

  // this.IndentForm = this.fb.group({
  //   storeItem: this.fb.group({
  //     itemId: [null, Validators.required]
  //   }),
  //   employee: this.fb.group({
  //     id: [role_id, Validators.required]
  //   }),
  //   issueItem: this.fb.group({
  //     issueId: [null]
  //   }),
  //   quantity: [null, Validators.required],
  //   estimatedPrice: [null, Validators.required],
  //   venderAdd: [null]
  // })

  // this.ResponceForm = this.fb.group({
  //   resStatus: ['INDENT'],
  //   pdiId: [null],
  //   issueStatus: [null],
  //   coments: [null, Validators.required],
  //   remarks: [null],
  //   indentRaised: [true], 
  //   poRaised: [false],
  //   doRaised: [false],
  //   employe: this.fb.group({
  //     id: [role_id]
  //   })
  // })

  // this.IndentOpenForm = this.fb.group({
  //   quantity: [null, Validators.required],
  //   coments: [null, Validators.required],
  //   remarks: [null],
  //   indentId: [null, Validators.required],
  // })

  // });

  //   if(this.admin) {
  //     this.IndentOpenForm.addControl("vendorSelect",this.fb.control([null, Validators.required]));
  //   }

  //   this.postItem.ViewItem().subscribe(data => {
  //     this.item = data.Data;
  //   });
  //   this.post.ViewIndent().subscribe(data => {
  //     this.IndentSource = data.Data;
  //   });
  //   this.post.ViewIndentStatus('GM').subscribe(data => {
  //     this.VPIndentSource = data.Data;
  //     console.warn(data.Data);
  //   });
  //   this.post.ViewIndentStatus('ADMIN').subscribe(data => {
  //     this.ADMINIndentSource = data.Data;
  //   });
  //   this.post.ViewIndentStatus('ACCOUNT').subscribe(data => {
  //     this.ACCOUNTIndentSource = data.Data;
  //   });
  //   this.post.ViewIndentStatus('REJECT').subscribe(data => {
  //     this.REJECTIndentSource = data.Data;
  //   });
  //   this.post.ViewIndentStatus('DONE').subscribe(data => {
  //     this.DONEIndentSource = data.Data;
  //   });
  // }

  // NumberOnly(event) {
  //   if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 190 && event.which != 46 && event.which != 37 && event.which != 39)) {
  //     event.preventDefault();
  //   }
  // }



  // ItemPriceTotal(event) {
  //   this.IndentForm.get('estimatedPrice').setValue(null);
  //   this.IndentForm.get('quantity').setValue(null);
  //   this.tax = null;
  //   this.total = null;
  //   this.postItem.FindByIdItem(event).subscribe((data: any) => {
  //     this.tax = data.Data.paytax;
  //     this.vendorDate = data.Data.vendorDate;
  //   })
  // }

  // changeVender(event) {
  //   this.DataTransferVender.length = 0;
  //   for (let i = 0; i < event.length; i++) {
  //     this.DataTransferVender.push({ 'id': event[i] });
  //   }
  // }

  // taxToatal(event) {
  //   let price = event.target.value;
  //   let quantity = this.IndentForm.value.quantity;
  //   if (this.tax != null && price != null && quantity != null) {
  //     this.basicAmmount = quantity * price;
  //     this.total = (quantity * price * this.tax / 100) + quantity * price;
  //   }
  // }
  // taxToatalQantity(event) {
  //   let price = this.IndentForm.value.estimatedPrice;
  //   let quantity = event.target.value;
  //   if (this.tax != null && price != null && quantity != null) {
  //     this.basicAmmount = quantity * price;
  //     this.total = (quantity * price * this.tax / 100) + quantity * price;
  //   }
  // }

  // onIndentFormSubmit() {
  //   this.IndentForm.removeControl('venderAdd');
  //   this.IndentForm.addControl('dataVendorAndIndent', this.fb.control(this.DataTransferVender));

  //   this.post.CreateIndent(this.IndentForm.value).subscribe((data: any) => {

  //     this.ResponceForm.get('coments').setValue("create indent");
  //     this.ResponceForm.get('remarks').setValue("create indent");
  //     this.ResponceForm.get('pdiId').setValue(data.Data.indentId);
  //     this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
  //       this.allAlert('success', `Indent Created !`, 'Successfully Create Indent');
  //       this.NbDialogRef.close();
  //       this.ngOnInit();
  //     }, (error: any) => {
  //       this.ngOnInit();
  //       this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //     })
  //   }, (error: any) => {
  //     this.ngOnInit();
  //     this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //   })
  // }

  // onChangeIndentStatus(event, dialog: TemplateRef<any>) {
  //   this.IndentOpenForm.reset();
  //   this.statuschange = event;
  //   this.IndentOpenForm.get('indentId').setValue(event.indentId);
  //   this.IndentOpenForm.get('quantity').setValue(event.quantity);
  //   this.NbDialogRef1 = this.dialogService.open(
  //     dialog,
  //     {
  //       closeOnBackdropClick: false,
  //     });
  // }

  // onChangeIndentViewStatus(event, dialog: TemplateRef<any>) {
  //   this.postResponce.ViewByStatusResponce('INDENT', event.indentId).subscribe((data: any) => {
  //     this.ResponceSource = data.Data;
  //   })

  //   this.NbDialogRef2 = this.dialogService.open(
  //     dialog,
  //     {
  //       closeOnBackdropClick: false,
  //     });
  // }

  // ViewVendor(event, dialog: TemplateRef<any>) {
  //   console.warn(this.statuschange.dataVendorAndIndent);
  //   this.vendorDetails = this.statuschange.dataVendorAndIndent;
  //   // this.venderService.ViewVenderById(event).subscribe((data: any) => {
  //     // this.vendorDetails = data.Data;
  //     this.NbDialogRef3 = this.dialogService.open(
  //       dialog,
  //       {
  //         closeOnBackdropClick: false,
  //       });
  //   // })
  // }

  // indentOpen() {
  //   this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
  //   this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
  //   this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

  //   this.IndentOpenSatatus.get('indentStatus').setValue(null);
  //   if (this.admin) {
  //     this.IndentOpenSatatus.get('indentStatus').setValue('ACCOUNT');
  //     this.IndentOpenSatatus.addControl('vendorData',this.fb.group({ id: [this.IndentOpenForm.value.vendorSelect]}));
  //     this.ResponceForm.get('issueStatus').setValue("ADMIN");
  //   }
  //   else if (this.gm) {
  //     this.IndentOpenSatatus.get('indentStatus').setValue('ADMIN');
  //     this.ResponceForm.get('issueStatus').setValue("GM");
  //   }
  //   else if (this.account) {
  //     this.IndentOpenSatatus.get('indentStatus').setValue('DONE');
  //     this.ResponceForm.get('issueStatus').setValue("ACCOUNT");
  //   }

  //   this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, this.IndentOpenSatatus.value).subscribe((data: any) => {
  //     this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
  //       this.allAlert('success', `Indent Approved !`, 'Successfully Indent Approved');
  //       this.NbDialogRef1.close();
  //       this.ngOnInit();
  //     }, (error: any) => {
  //       this.ngOnInit();
  //       this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //     })
  //   }, (error: any) => {
  //     this.ngOnInit();
  //     this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //   });
  // }

  // indentReject() {
  //   this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
  //   this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
  //   this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

  //   let Opendata = null;
  //   if (this.admin) {
  //     Opendata = {
  //       'indentStatus': 'REJECT'
  //     }
  //     this.ResponceForm.get('issueStatus').setValue("ADMIN");
  //   }
  //   else if (this.gm) {
  //     Opendata = {
  //       'indentStatus': 'REJECT'
  //     }
  //     this.ResponceForm.get('issueStatus').setValue("GM");
  //   }

  //   this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, Opendata).subscribe((data: any) => {
  //     this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
  //       this.allAlert('success', `Indent Rejected !`, 'Successfully Indent Rejected');
  //       this.NbDialogRef1.close();
  //       this.ngOnInit();
  //     }, (error: any) => {
  //       this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //     })
  //   }, (error: any) => {
  //     this.allAlert('danger', `Not Created !`, `${error.error.message}`);
  //   });
  // }



  // Final code 
  // Final code 
  // Final code 


  createIndent(dialog: TemplateRef<any>) {
    this._router.navigate(['pages/store/add-indent']);
  }

  backClicked() {
    this._location.back();
  }

  ViewIndentDetails(event) {
    console.warn(event.indentId);
    this._router.navigateByUrl(`pages/store/indent/view-indent/${event.indentId}`);
  }

  openIndentDetails(event, dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      ViewIndentComponent,
      {
        context: {
          indentId: event
        },
        closeOnBackdropClick: false,
        // hasBackdrop: true,
      }).onClose.subscribe((data) => {

        // location.reload();
        this.ngOnInit();
      }
      )
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

