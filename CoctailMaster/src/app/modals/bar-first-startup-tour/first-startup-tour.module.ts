import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstStartupTourPageRoutingModule } from './first-startup-tour-routing.module';

import { FirstStartupTourPage } from './first-startup-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstStartupTourPageRoutingModule
  ],
  declarations: [FirstStartupTourPage]
})
export class FirstStartupTourPageModule {}
