import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopFirstStartupTourPageRoutingModule } from './shop-first-startup-tour-routing.module';

import { ShopFirstStartupTourPage } from './shop-first-startup-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopFirstStartupTourPageRoutingModule
  ],
  declarations: [ShopFirstStartupTourPage]
})
export class ShopFirstStartupTourPageModule {}
