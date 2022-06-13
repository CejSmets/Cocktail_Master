import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFirstStartupTourPage } from './home-first-startup-tour.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFirstStartupTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFirstStartupTourPageRoutingModule {}
