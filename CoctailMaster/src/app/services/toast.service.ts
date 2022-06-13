import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {createAnimation} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  anim: Animation;
  constructor(public toastController: ToastController) {
  }

  async buildToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      animated: true,
      cssClass: 'my-custom-toast-css',
      position: 'bottom',
      leaveAnimation: (baseEl: any) => createAnimation()
        .fromTo('transform', 'translateY(0px)', 'translateY(100px)')
        .fromTo('opacity', '1', '0')
        .duration(350)
        .addElement(toast),
    });
    toast.present();
  }

  presentToast(message: string, duration: number) {
    this.toastController.dismiss().then((obj) => {}).catch(() => {})
      .finally(() => this.buildToast(message, duration));
  }
}
