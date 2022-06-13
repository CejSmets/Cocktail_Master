import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualBarPage } from './virtualBar.page';

const routes: Routes = [
  {
    path: '',
    component: VirtualBarPage,
  },
  {
    path: 'ingredient-search/:params',
    loadChildren: () => import ('./ingredient-search/ingredient-search.module').then( m => m.IngredientSearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualBarPageRoutingModule {}
