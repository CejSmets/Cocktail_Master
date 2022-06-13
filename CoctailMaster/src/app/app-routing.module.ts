import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'drinkdetail',
    loadChildren: () => import('./drinkdetail/drinkdetail.module').then( m => m.DrinkdetailPageModule)
  },
  {
    path: 'popover-page',
    loadChildren: () => import('./popover-page/popover-page.module').then( m => m.PopoverPagePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./modals/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'ingredient-search',
    loadChildren: () => import('./virtualBar/ingredient-search/ingredient-search.module').then( m => m.IngredientSearchPageModule)
  },
  {
    path: 'bar-first-startup-tour',
    loadChildren: () => import('./modals/bar-first-startup-tour/first-startup-tour.module').then(m => m.FirstStartupTourPageModule)
  },
  {
    path: 'home-bar-first-startup-tour',
    loadChildren: () => import('./modals/home-first-startup-tour/home-first-startup-tour.module').then( m => m.HomeFirstStartupTourPageModule)
  },  {
    path: 'shop-first-startup-tour',
    loadChildren: () => import('./modals/shop-first-startup-tour/shop-first-startup-tour.module').then( m => m.ShopFirstStartupTourPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
