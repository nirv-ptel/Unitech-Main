import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductionComponent } from './production/production.component';
import { ProductCategoryComponent } from './store/product-category/product-category.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    HttpClientModule
  ],
  declarations: [
    PagesComponent,
    UserComponent,
    ProductionComponent,
  ],
})
export class PagesModule {
}
