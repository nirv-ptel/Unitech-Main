import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import {  UserDetailsComponent } from './user-details/user-details.component';
import { UserAddComponent } from './user-add/user-add.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserOneComponent } from './user-one/user-one.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    UserAddComponent,
    UserDetailsComponent,
    UserOneComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    UserDetailsRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbToggleModule,
    NbSelectModule,
    NbIconModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NbListModule,
    NbLayoutModule,
    NbUserModule,
    NbTabsetModule
  ],
  exports: [UserDetailsComponent],
  bootstrap: [UserDetailsComponent]
})
export class UserDetailsModule { }
