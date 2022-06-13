import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SplashPage} from './modals/splash/splash.page';
import {ConnectionService} from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public modalController: ModalController, public connectionService: ConnectionService) {
    this.modalController.create({
      component: SplashPage,
      cssClass: 'splash-modal'
    }).then((res) => {
      res.present();
      setTimeout(() => {
        res.dismiss();
      }, 3000);
    });
  }
}

