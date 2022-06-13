import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientSearchPageRoutingModule } from './ingredient-search-routing.module';

import { IngredientSearchPage } from './ingredient-search.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IngredientSearchPageRoutingModule,
        SharedModule
    ],
  declarations: [IngredientSearchPage]
})
export class IngredientSearchPageModule {}
