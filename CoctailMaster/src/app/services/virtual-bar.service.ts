import { Injectable } from '@angular/core';
import {Storage} from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class VirtualBarService {
  ownedIngredients: string[] = [];
  constructor() {
    this.initIngredients();
  }

  async initIngredients() {
    const item = await Storage.get({
      key: 'ingredients'
    });
    if (item.value === null) {
      const ingredients: string[] = [];
      await Storage.set({
        key: 'ingredients',
        value: JSON.stringify(ingredients)
      });
      this.ownedIngredients = ingredients;
    }
    else {
      this.ownedIngredients = JSON.parse(item.value);
    }
  }

  async setIngredients() {
    await Storage.set({
      key: 'ingredients',
      value: JSON.stringify(this.ownedIngredients)
    });
  }

  async addIngredient(ingredient: string) {
    if (!this.ownedIngredients.includes(ingredient)) {
      this.ownedIngredients.push(ingredient);
    }
    await this.setIngredients();
  }

  async removeIngredient(ingredient: string) {
    const tempIngredient = this.ownedIngredients.filter(x => x.toLowerCase() === ingredient.toLowerCase());
    this.ownedIngredients.splice(this.ownedIngredients.indexOf(tempIngredient[0]), 1);
    await this.setIngredients();
  }
}
