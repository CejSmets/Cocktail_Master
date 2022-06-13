import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstStartupTourPage } from './first-startup-tour.page';

const routes: Routes = [
  {
    path: '',
    component: FirstStartupTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstStartupTourPageRoutingModule {}
