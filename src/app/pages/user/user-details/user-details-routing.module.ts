import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOneComponent } from './user-one/user-one.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserAddComponent
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'userdetails',
    component: UserDetailsComponent
  },
  {
    path: 'userone',
    component: UserOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
