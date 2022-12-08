import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      canActivate:[AuthGuard],
      // data: {
      //   expectedRoles: ['ROLE_ADMIN']
      // },
      component: DashboardComponent,
    },
    {
      path: 'user',
      canActivate:[AuthGuard,RoleGuard],
      data: {
        expectedRoles: ['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_HR']
      },
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'production',
      canActivate:[AuthGuard,RoleGuard],
      data: {
        expectedRoles: ['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_SUPERVISOR','ROLE_QC']
      },
      loadChildren: () => import('./production/production.module')
        .then(m => m.ProductionModule),
    },
    {
      path: 'purchase',
      canActivate:[AuthGuard,RoleGuard],
      data: {
        expectedRoles: ['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_PURCHASER','ROLE_QC']
      },
      loadChildren: () => import('./purchase/purchase.module')
        .then(m => m.PurchaseModule),
    },
    {
      path: 'store',
      data: {
        expectedRoles: ['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_HR']
      },
      loadChildren: () => import('./store/store.module')
        .then(m => m.StoreModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
