import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompingredientsPageRoutingModule } from './compingredients-routing.module';

import { CompingredientsPage } from './compingredients.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompingredientsPageRoutingModule,
    SharedModule
  ],
  declarations: [CompingredientsPage]
})
export class CompingredientsPageModule {}
