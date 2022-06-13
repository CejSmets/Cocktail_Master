import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VirtualBarPage } from './virtualBar.page';
import { VirtualBarPageRoutingModule } from './virtualBar-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TryReconnectComponent} from "../shared/try-reconnect/try-reconnect.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VirtualBarPageRoutingModule,
    SharedModule
  ],
  exports: [
    TryReconnectComponent
  ],
  declarations: [VirtualBarPage, TryReconnectComponent]
})
export class VirtualBarPageModule {}
