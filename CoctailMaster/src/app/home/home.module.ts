import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {VirtualBarPageModule} from "../virtualBar/virtualBar.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomePageRoutingModule,
        SharedModule,
        VirtualBarPageModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
