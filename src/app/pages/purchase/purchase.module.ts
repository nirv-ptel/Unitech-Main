import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { AddVenderComponent } from './vender/add-vender/add-vender.component';
import { VenderDetailsComponent } from './vender/vender-details/vender-details.component';
import { ContractDetailsComponent } from './contract/contract-details/contract-details.component';
import { AddContractComponent } from './contract/add-contract/add-contract.component';
import { AddDoComponent } from './do/add-do/add-do.component';
import { DoDetailsComponent } from './do/do-details/do-details.component';
import { PoDetailsComponent } from './po/po-details/po-details.component';
import { AddPoComponent } from './po/add-po/add-po.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddItemComponent } from './item/add-item/add-item.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';


@NgModule({
  declarations: [
    AddVenderComponent,
    VenderDetailsComponent,
    ContractDetailsComponent,
    AddContractComponent,
    AddDoComponent,
    DoDetailsComponent,
    PoDetailsComponent,
    AddPoComponent,
    AddItemComponent,
    ItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbSelectModule,
    NbIconModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
  ]
})
export class PurchaseModule { }
