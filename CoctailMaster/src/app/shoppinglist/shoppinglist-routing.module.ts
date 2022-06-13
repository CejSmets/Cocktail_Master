import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistPage } from './shoppinglist.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppinglistPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppinglistPageRoutingModule {}
