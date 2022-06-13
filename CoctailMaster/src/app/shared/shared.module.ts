import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {DrinkItemComponent} from './drink-item/drink-item.component';
import {RouterModule} from '@angular/router';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {SearchResultsComponent} from "./search-results/search-results.component";



@NgModule({
    declarations: [DrinkItemComponent, LoadingSpinnerComponent, SearchResultsComponent],
    exports: [DrinkItemComponent, LoadingSpinnerComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class SharedModule { }
