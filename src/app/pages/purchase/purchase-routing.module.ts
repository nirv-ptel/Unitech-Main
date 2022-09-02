import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractComponent } from './contract/add-contract/add-contract.component';
import { ContractDetailsComponent } from './contract/contract-details/contract-details.component';
import { AddDoComponent } from './do/add-do/add-do.component';
import { DoDetailsComponent } from './do/do-details/do-details.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { AddPoComponent } from './po/add-po/add-po.component';
import { PoDetailsComponent } from './po/po-details/po-details.component';
import { AddVenderComponent } from './vender/add-vender/add-vender.component';
import { VenderDetailsComponent } from './vender/vender-details/vender-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'addvender',
    pathMatch: 'full',
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user-details/user-details.module')
  //     .then(m => m.UserDetailsModule),
  // },
  {
    path: 'addvender',
    component: AddVenderComponent
  },
  {
    path: 'venderdetails',
    component: VenderDetailsComponent
  },
  {
    path: 'additem',
    component: AddItemComponent
  },
  {
    path: 'itemdetails',
    component: ItemDetailsComponent
  },
  {
    path: 'addcontract',
    component: AddContractComponent
  },
  {
    path: 'contractdetails',
    component: ContractDetailsComponent
  },
  {
    path: 'addpo',
    component: AddPoComponent
  },
  {
    path: 'podetails',
    component: PoDetailsComponent
  },
  {
    path: 'adddo',
    component: AddDoComponent
  },
  {
    path: 'dodetails',
    component: DoDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
