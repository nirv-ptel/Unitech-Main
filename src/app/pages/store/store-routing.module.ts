import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIndentComponent } from './indent/add-indent/add-indent.component';
import { IndentComponent } from './indent/indent.component';
import { ViewIndentComponent } from './indent/view-indent/view-indent.component';
import { IssueComponent } from './issue/issue.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
  },
  {
    path: 'category',
    component: ProductCategoryComponent
  },
  {
    path: 'unit',
    component: ProductUnitComponent
  },
  {
    path: 'item',
    component: ProductItemComponent
  },
  {
    path: 'issue',
    component: IssueComponent
  },
  {
    path: 'indent',
    children: [
      {
        path: '',
        component: IndentComponent,
      },
      {
        path: 'view-indent/:id',
        component: ViewIndentComponent
      },
    ]
  },

  {
    path: 'add-indent',
    component: AddIndentComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
