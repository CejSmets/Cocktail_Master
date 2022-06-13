import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompingredientsPage } from './compingredients.page';

const routes: Routes = [
  {
    path: '',
    component: CompingredientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompingredientsPageRoutingModule {}
