import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../services/drink.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../../datatypes/drink';
import {NavController} from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {VirtualBarService} from '../../services/virtual-bar.service';
import {ToastService} from '../../services/toast.service';
import {ShoppingService} from '../../services/shopping.service';
import {ConnectionService} from '../../services/connection.service';
import {Network} from '@capacitor/network';

@Component({
  selector: 'app-compingredients',
  templateUrl: './compingredients.page.html',
  styleUrls: ['./compingredients.page.scss'],
})
export class CompingredientsPage implements OnInit {
  title: string;
  checkOwned: boolean;
  drinkList: Drink[] = [];
  toggledIngredients: string[] = [];
  loaded: boolean;

  constructor(public drinkService: DrinkService, public activatedRoute: ActivatedRoute, public apiService: ApiService,
              public virtualBarService: VirtualBarService, public toastService: ToastService,
              public shoppingService: ShoppingService, public connectionService: ConnectionService) {
    Network.addListener('networkStatusChange', () => {
      if (connectionService.connected) {
        this.loaded = false;
        this.tryReconnect();
      }
    });
  }

  ngOnInit() {
    this.setData();
  }

  async tryReconnect() {
    this.loaded = false;
    setTimeout(() => {
      this.setData();
    }, 2000);
  }

  async setData() {
    this.loaded = false;
    this.drinkList = [];
    this.toggledIngredients = [];

    if (!this.connectionService.connected) {
      this.loaded = true;
      return;
    }

    const checkOwned = this.activatedRoute.snapshot.paramMap.get('checkOwned');
    const drinkId = this.activatedRoute.snapshot.paramMap.get('id');
    const drinks = await this.apiService.getDrinkById(drinkId);
    drinks.forEach(d => this.drinkList.push(new Drink({
        name: d.strDrink,
        tags: d.strTags,
        id: d.idDrink,
        category: d.strCategory,
        alcoholic: d.strAlcoholic,
        glass: d.strGlass,
        instructions: d.strInstructions,
        thumbnail: d.strDrinkThumb,
        ingredientList: this.drinkService.getIngredients(d),
        measureList: this.drinkService.getMeasures(d)
      })));

    if (checkOwned === 'true') {
      this.checkOwned = true;
      this.title = 'What you have:';
    } else if (checkOwned === 'false') {
      this.checkOwned = false;
      this.title = 'What you\'ll need:';
    }
    this.loaded = true;
  }

  async addToShoppingList() {
    for (const ingredient of this.toggledIngredients) {
      await this.shoppingService.addShoppingItem(ingredient, true);
    }
    if (this.toggledIngredients.length > 0) {
      this.toastService.presentToast('Added to shopping list!', 800);
      this.toggledIngredients = [];
    }
  }

  removeFromBar() {
    for (const ingredient of this.toggledIngredients) {
      this.virtualBarService.removeIngredient(ingredient);
    }
    if (this.toggledIngredients.length > 0) {
      this.toastService.presentToast('Removed from cabinet.', 800);
      this.toggledIngredients = [];
    }
  }

  addToBar() {
    for (const ingredient of this.toggledIngredients) {
      this.virtualBarService.addIngredient(ingredient);
    }
    if (this.toggledIngredients.length > 0) {
      this.toastService.presentToast('Added to cabinet!', 800);
      this.toggledIngredients = [];
    }
  }

  toggleIngredient(ingredient: string) {
    if (this.toggledIngredients.includes(ingredient)){
      this.toggledIngredients.splice(this.toggledIngredients.indexOf(ingredient), 1);
    }
    else {
      this.toggledIngredients.push(ingredient);
    }
  }
}
