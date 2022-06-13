import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkdetailPageRoutingModule } from './drinkdetail-routing.module';

import { DrinkdetailPage } from './drinkdetail.page';
import {DrinkDetailComponent} from "../shared/drink-detail/drink-detail.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DrinkdetailPageRoutingModule,
        SharedModule
    ],
    declarations: [DrinkdetailPage, DrinkDetailComponent]
})
export class DrinkdetailPageModule {}
