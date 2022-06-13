import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppinglistPage } from './shoppinglist.page';

import { ShoppinglistPageRoutingModule } from './shoppinglist-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppinglistPage }]),
    ShoppinglistPageRoutingModule,
  ],
  declarations: [ShoppinglistPage]
})
export class ShoppinglistPageModule {}
