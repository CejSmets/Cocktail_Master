import {Component, OnInit} from '@angular/core';
import {ShoppingItem} from '../../datatypes/shoppingItem';
import {ShoppingService} from '../services/shopping.service';
import {VirtualBarService} from '../services/virtual-bar.service';
import {ToastService} from '../services/toast.service';
import {ModalService} from "../services/modal.service";
import {Storage} from "@capacitor/storage";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: 'shoppinglist.page.html',
  styleUrls: ['shoppinglist.page.scss']
})
export class ShoppinglistPage implements OnInit{
  itemInput: string;
  constructor(public shoppingService: ShoppingService, public virtualBarService: VirtualBarService,
              public toastService: ToastService, public modalService: ModalService) {}

  ngOnInit() {
    this.checkFirstRun();
  }

  async checkFirstRun() {
    await Storage.get({
      key: 'shop_first_time'
    }).then((val) => {
      if (val.value !== null){
        console.log('Not visiting shop for the first time');
      }
      else {
        this.modalService.presentShopFirstStartupTour();
        Storage.set({
          key: 'shop_first_time',
          value: 'done'
        });
      }
    });
  }

  async deleteShoppingItem(item: ShoppingItem){
    await this.shoppingService.deleteShoppingItem(item);
  }

  async addShoppingItem() {
    if (this.itemInput !== undefined && this.itemInput !== '') {
      await this.shoppingService.addShoppingItem(this.itemInput, false);
    }
    this.itemInput = '';
  }

  async addShoppingItemToBar(item: ShoppingItem) {
    await this.virtualBarService.addIngredient(item.text);
    await this.deleteShoppingItem(item);
    this.toastService.presentToast('Added to cabinet!', 800);
  }

  async onItemReorder(event) {
    const itemMove = this.shoppingService.shoppingList.splice(event.detail.from, 1)[0];
    this.shoppingService.shoppingList.splice(event.detail.to, 0, itemMove);
    await this.shoppingService.setShoppingList();
    event.detail.complete(true);
  }
}
