import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { AddmachineComponent } from './machine/addmachine/addmachine.component';
import { PackingComponent } from './department/packing/packing.component';

import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddParameterComponent } from './parameter/add-parameter/add-parameter.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MachineDetailsComponent } from './machine/machine-details/machine-details.component';
import { PreprateryComponent } from './department/prepratery/prepratery.component';
import { RingframeComponent } from './department/ringframe/ringframe.component';
import { WindingComponent } from './department/winding/winding.component';
import { UtilityComponent } from './department/utility/utility.component';
import { WasteroomComponent } from './department/wasteroom/wasteroom.component';
import { SetParameterComponent } from './parameter/set-parameter/set-parameter.component';
import { CombersComponent } from './department/combers/combers.component';
import { LapformerComponent } from './department/lapformer/lapformer.component';
import { TimeResolve } from './TimeResolve';

@NgModule({
  declarations: [
    AddmachineComponent,
    PreprateryComponent,
    RingframeComponent,
    WindingComponent,
    PackingComponent,
    UtilityComponent,
    WasteroomComponent,
    AddParameterComponent,
    MachineDetailsComponent,
    SetParameterComponent,
    CombersComponent,
    LapformerComponent,

  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    NbInputModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbSelectModule,
    NbTabsetModule,
    NbIconModule,
    NbCheckboxModule,
    NbToggleModule,
    NbRadioModule,
    NbDatepickerModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NbSpinnerModule,
  ],
  providers: [DecimalPipe, TimeResolve],
})
export class ProductionModule { }
