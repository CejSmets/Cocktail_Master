import { Injectable } from '@angular/core';
import {AnimationController, IonRouterOutlet, ModalController} from '@ionic/angular';
import {DrinkdetailPage} from '../drinkdetail/drinkdetail.page';
import {FirstStartupTourPage} from '../modals/bar-first-startup-tour/first-startup-tour.page';
import {HomeFirstStartupTourPage} from "../modals/home-first-startup-tour/home-first-startup-tour.page";
import {ShopFirstStartupTourPage} from "../modals/shop-first-startup-tour/shop-first-startup-tour.page";


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) { }

  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: DrinkdetailPage,
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
      componentProps: {
        drinkId: id
      },
    });
    return await modal.present();
  }

  async presentBarFirstStartupTour() {
    const modal = await this.modalController.create({
      component: FirstStartupTourPage,
      cssClass: 'first-startup-modal',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async presentHomeFirstStartupTour() {
    const modal = await this.modalController.create({
      component: HomeFirstStartupTourPage,
      cssClass: 'first-startup-modal',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async presentShopFirstStartupTour() {
    const modal = await this.modalController.create({
      component: ShopFirstStartupTourPage,
      cssClass: 'first-startup-modal',
      swipeToClose: true,
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
