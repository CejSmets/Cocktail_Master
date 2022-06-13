import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientSearchPage } from './ingredient-search.page';

const routes: Routes = [
  {
    path: '',
    component: IngredientSearchPage
  },
  {
    path: 'compingredients/:checkOwned/:id',
    loadChildren: () => import('../../home/compingredients/compingredients.module').then( m => m.CompingredientsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientSearchPageRoutingModule {}
