import { Injectable } from '@angular/core';
import {ShoppingItem} from "../../datatypes/shoppingItem";
import {Storage} from "@capacitor/storage";
import {Drink} from "../../datatypes/drink";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  shoppingList: ShoppingItem[] = [];

  constructor() {
    this.initShoppingList();
  }

  async initShoppingList() {
    const item = await Storage.get({
      key: 'shoppingList'
    });
    if (item.value === null) {
      const shoppingItems: ShoppingItem[] = [];
      await Storage.set({
        key: 'shoppingList',
        value: JSON.stringify(shoppingItems)
      });
      this.shoppingList = shoppingItems;
    }
    else {
      this.shoppingList = JSON.parse(item.value);
    }
  }

  async setShoppingList() {
    await Storage.set({
      key: 'shoppingList',
      value: JSON.stringify(this.shoppingList)
    });
  }

  async deleteShoppingItem(item: ShoppingItem) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    await this.setShoppingList();
  }

  async addShoppingItem(text: string, isIngredient: boolean) {
    const itemToAdd = new ShoppingItem({
      text,
      isIngredient
    });
    if (!this.shoppingList.some(x => x.text === itemToAdd.text && x.isIngredient === itemToAdd.isIngredient)) {
      this.shoppingList.push(itemToAdd);
    }
    await this.setShoppingList();
  }
}
