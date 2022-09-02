import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RoleComponent } from './role/role.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  ]
})
export class UserModule { }
