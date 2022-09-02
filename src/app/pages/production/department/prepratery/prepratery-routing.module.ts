import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeResolve } from '../../TimeResolve';
import { BloowroomComponent } from './bloowroom/bloowroom.component';
import { CardingComponent } from './carding/carding.component';
import { DrawframesComponent } from './drawframes/drawframes.component';
import { FinisherComponent } from './finisher/finisher.component';
import { SimplexComponent } from './simplex/simplex.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bloowroom',
    pathMatch: 'full',
  },
  {
    path: 'bloowroom',
    component: BloowroomComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'carding',
    component: CardingComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'drawframes',
    component: DrawframesComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'finisher',
    component: FinisherComponent,
    resolve: {
      times: TimeResolve
    }
  },
  {
    path: 'simplex',
    component: SimplexComponent,
    resolve: {
      times: TimeResolve
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreprateryRoutingModule { }
