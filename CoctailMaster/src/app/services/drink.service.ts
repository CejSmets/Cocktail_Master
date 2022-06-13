import { Injectable } from '@angular/core';
import {Drink} from '../../datatypes/drink';
import {ModalController} from '@ionic/angular';
import {DrinkComplete} from '../../datatypes/drinkComplete';
import {VirtualBarService} from './virtual-bar.service';
import {ToastService} from './toast.service';
import {Storage} from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private favouritedDrinks: Drink[] = [];
  constructor(public modalController: ModalController, public virtualBarService: VirtualBarService,
              public toastService: ToastService) {
    this.initFavourites();
  }

  async initFavourites() {
    const item = await Storage.get({
      key: 'favDrinks'
    });
    if (item.value === null) {
      const drinks: Drink[] = [];
      await Storage.set({
        key: 'favDrinks',
        value: JSON.stringify(drinks)
      });
      this.favouritedDrinks = drinks;
    }
    else {
      this.favouritedDrinks = JSON.parse(item.value);
    }
  }

  async setFavourites() {
    await Storage.set({
      key: 'favDrinks',
      value: JSON.stringify(this.favouritedDrinks)
    });
  }

  async favouriteDrink(drink: Drink) {
    if (!this.checkFavourited(drink)){
      this.favouritedDrinks.push(drink);
      this.toastService.presentToast('Added to favourites!', 800);
    }
    else {
      this.favouritedDrinks.splice(this.favouritedDrinks.indexOf(drink), 1);
      this.toastService.presentToast('Removed from favourites', 800);
    }
    await this.setFavourites();
  }

  checkIngredients(drink: Drink, checkForOwned: boolean): string {
    const neededIngredientsOwned = drink.ingredientList.filter(x => this.virtualBarService.ownedIngredients.includes(x));
    if (checkForOwned) {
      return neededIngredientsOwned.length.toString();
    }
    return (drink.ingredientList.length - neededIngredientsOwned.length).toString();
  }

  checkFavourited(drink: Drink): boolean {
    return this.favouritedDrinks.includes(drink);
  }

  getOwned(drinkIngredientList: string[]) {
    return drinkIngredientList.filter(x => this.virtualBarService.ownedIngredients.includes(x));
  }

  getNotOwned(drinkIngredientList: string[]) {
    return drinkIngredientList.filter(x => !this.virtualBarService.ownedIngredients.includes(x));
  }

  getFavourited(): Drink[] {
    return this.favouritedDrinks;
  }

  getSource(drink: string): string {
    return `https://thecocktaildb.com/images/ingredients/${drink}-small.png`;
  }

  getIngredients(drink: DrinkComplete): string[] {
    const ingredientList: string[] = [];
    for (const drinkKey in drink) {
      if (drinkKey.startsWith('strIngredient') && drink[drinkKey] != null && drink[drinkKey] !== '') {
        ingredientList.push(drink[drinkKey]);
      }
    }
    return ingredientList;
  }

  getMeasurePerIngredient(ingredient: string, drink: DrinkComplete): string {
    let ingredientId;
    for (const drinkKey in drink) {
      if (drink[drinkKey] === ingredient) {
        ingredientId = drinkKey.charAt(drinkKey.length - 2) + drinkKey.charAt(drinkKey.length - 1);
      }
    }
    for (const drinkKey in drink) {
      if (drinkKey.startsWith('strMeasure') && drinkKey.endsWith(ingredientId.replace('t', 'e'))){
        if (drink[drinkKey] != null){
          return `${drink[drinkKey]}`;
        }
        return '';
      }
    }
  }

  getMeasures(drink: DrinkComplete): string[] {
    const measureList: string[] = [];
    for (const drinkKey in drink) {
      if (drinkKey.startsWith('strMeasure') && drink[drinkKey] != null && drink[drinkKey] !== ''){
        measureList.push(drink[drinkKey]);
      }
    }
    return measureList;
  }

  getTags(d: DrinkComplete): string {
    let tags = '';
    const tagArray: string[] = [];
    let tagString = d.strTags;
    if (tagString === null) {
    }
    while (tagString !== null && tagArray.length < 3) {
      if (tagString.indexOf(',') !== -1) {
        tagArray.push(tagString.substring(0, tagString.indexOf(',')));
        tagString = tagString.substring(tagString.indexOf(',') + 1);
      }
      else {
        tagArray.push(tagString);
        tagString = null;
      }
    }
    for (const tag of tagArray) {
      tags += tag;
      if (tag !== tagArray[tagArray.length - 1]) {
        tags += `<br/>`;
      }
    }
    return tags;
  }
}
