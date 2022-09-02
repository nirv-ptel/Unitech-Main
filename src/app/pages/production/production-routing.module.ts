import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParameterComponent } from './parameter/add-parameter/add-parameter.component';
import { AddmachineComponent } from './machine/addmachine/addmachine.component';
import { MachineDetailsComponent } from './machine/machine-details/machine-details.component';
import { PackingComponent } from './department/packing/packing.component';
import { RingframeComponent } from './department/ringframe/ringframe.component';
import { WindingComponent } from './department/winding/winding.component';
import { UtilityComponent } from './department/utility/utility.component';
import { WasteroomComponent } from './department/wasteroom/wasteroom.component';
import { SetParameterComponent } from './parameter/set-parameter/set-parameter.component';
import { CombersComponent } from './department/combers/combers.component';
import { LapformerComponent } from './department/lapformer/lapformer.component';
import { TimeResolve } from './TimeResolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'addmachine',
    pathMatch: 'full',
  },
  {
    path: 'prepratery',
    loadChildren: () => import('./department/prepratery/prepratery.module')
      .then(m => m.PreprateryModule),
  },
  {
    path: 'addmachine',
    component: AddmachineComponent
  },
  {
    path: 'addparameter',
    component: AddParameterComponent
  },
  {
    path: 'setparameter',
    component: SetParameterComponent
  },
  {
    path: 'machinedetails',
    component: MachineDetailsComponent
  },
  {
    path: 'combers',
    component: CombersComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'lapformer',
    component: LapformerComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'ringframe',
    component: RingframeComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'winding',
    component: WindingComponent
  },
  {
    path: 'packing',
    component: PackingComponent
  },
  {
    path: 'utility',
    component: UtilityComponent
  },
  {
    path: 'wasteroom',
    component: WasteroomComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
