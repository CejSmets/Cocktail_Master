import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopFirstStartupTourPage } from './shop-first-startup-tour.page';

const routes: Routes = [
  {
    path: '',
    component: ShopFirstStartupTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopFirstStartupTourPageRoutingModule {}
