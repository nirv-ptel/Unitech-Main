import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PreprateryRoutingModule } from './prepratery-routing.module';
import { BloowroomComponent } from './bloowroom/bloowroom.component';
import { CardingComponent } from './carding/carding.component';
import { DrawframesComponent } from './drawframes/drawframes.component';
import { FinisherComponent } from './finisher/finisher.component';
import { SimplexComponent } from './simplex/simplex.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { StrictNumberOnlyDirective } from '../../../../@core/utils/StrictNumberOnlyDirective';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TimeResolve } from '../../TimeResolve';


@NgModule({
  declarations: [
    BloowroomComponent,
    CardingComponent,
    DrawframesComponent,
    FinisherComponent,
    SimplexComponent,
  ],
  imports: [
    CommonModule,
    PreprateryRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbSelectModule,
    NbTabsetModule,
    NbIconModule,
    NbCheckboxModule,
    NbToggleModule,
    NbRadioModule,
    NbDatepickerModule,
  ],
  providers: [DecimalPipe, TimeResolve],
})
export class PreprateryModule { }
