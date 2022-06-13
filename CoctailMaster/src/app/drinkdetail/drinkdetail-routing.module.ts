import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkdetailPage } from './drinkdetail.page';

const routes: Routes = [
  {
    path: '',
    component: DrinkdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinkdetailPageRoutingModule {}
