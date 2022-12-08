import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { LoginService } from '../@service/auth/login.service';
import { MachineService } from '../@service/machine/machine.service';
import { RoleGuard } from '../auth/guard/role.guard';
import { ADMIN_MENU_ITEMS } from '../@menu/admin-menu';
import { PRODUCTION_MENU_ITEMS } from '../@menu/production-menu';
import { PURCHESE_MENU_ITEMS } from '../@menu/purchese-menu';
import { HR_MENU_ITEMS } from '../@menu/hr-menu';
import { MENU_ITEMS } from '../@menu/pages-menu';
import { QC_MENU_ITEMS } from '../@menu/qc-menu';
import { VM_MENU_ITEMS } from '../@menu/vm-menu';
import { STORE_MENU_ITEMS } from '../@menu/store-menu';
import { MAINTNANCE_MENU_ITEMS } from '../@menu/maintenance-menu';
import { ACCOUNT_MENU_ITEMS } from '../@menu/account-menu';
import { TimeGetService } from '../@service/timeGet/time-get.service';

export let webTime: any;

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu tag="menu" [items]="menuItems" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menuItems = [];
  time: any;

  constructor(private post: MachineService,
    private menuService: NbMenuService,
    private _auth: LoginService,
    private timeGet: TimeGetService) {
  }

  ngOnInit() {
    this.menuService.navigateHome('menu');
    let role = this._auth.user.roles.find((x => x));

    // =================sidebar role base========================== //
    
    if (role == 'ROLE_ADMIN') {
      this.menuService.addItems(ADMIN_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_SUBADMIN') {
      this.menuService.addItems(ADMIN_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_PURCHASER') {
      this.menuService.addItems(PURCHESE_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_SUPERVISOR') {
      this.menuService.addItems(PRODUCTION_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_HR') {
      this.menuService.addItems(HR_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_QC') {
      this.menuService.addItems(QC_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_MAINTENANCE') {
      this.menuService.addItems(MAINTNANCE_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_STORE') {
      this.menuService.addItems(STORE_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_GENERALMANAGER') {
      this.menuService.addItems(VM_MENU_ITEMS, 'menu');

    } else if (role == 'ROLE_ACCOUNT') {
      this.menuService.addItems(ACCOUNT_MENU_ITEMS, 'menu');

    } else {
      this.menuService.addItems([]);
      alert('not roole find');
    }

  }

}
