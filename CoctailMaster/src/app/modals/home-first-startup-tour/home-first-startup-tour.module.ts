import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeFirstStartupTourPageRoutingModule } from './home-first-startup-tour-routing.module';

import { HomeFirstStartupTourPage } from './home-first-startup-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeFirstStartupTourPageRoutingModule
  ],
  declarations: [HomeFirstStartupTourPage]
})
export class HomeFirstStartupTourPageModule {}
