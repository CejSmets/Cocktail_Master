import {Component, OnInit, ViewChild} from '@angular/core';
import {DrinkService} from '../services/drink.service';
import {ApiService} from '../services/api.service';
import {VirtualBarService} from '../services/virtual-bar.service';
import {ShoppingService} from '../services/shopping.service';
import {ToastService} from '../services/toast.service';
import {Ingredient} from '../../datatypes/ingredient';
import {SearchService} from '../services/search.service';
import {IonSearchbar} from '@ionic/angular';
import {ConnectionService} from '../services/connection.service';
import {Network} from '@capacitor/network';
import {ModalService} from '../services/modal.service';
import {Storage} from '@capacitor/storage';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-virtualBar',
  templateUrl: 'virtualBar.page.html',
  styleUrls: ['virtualBar.page.scss']
})
export class VirtualBarPage implements OnInit {
  @ViewChild('searchBar') searchBar: IonSearchbar;
  searchValue = '';
  searchResults: string[] = [];
  alcoholicList: string[] = [];
  otherList: string[] = [];
  fruitList: string[] = [];
  toggledIngredients: string[] = [];
  params;
  loaded: boolean;

  constructor(public drinkService: DrinkService, public apiService: ApiService, public virtualBarService: VirtualBarService,
              public shoppingService: ShoppingService, public toastService: ToastService, public searchService: SearchService,
              public connectionService: ConnectionService, public modalService: ModalService) {
    Network.addListener('networkStatusChange', () => {
      if (connectionService.connected) {
        this.loaded = false;
        this.tryReconnect();
      }
    });
  }

  ngOnInit() {
    this.checkFirstRun();
  }

  ionViewWillEnter() {
    this.setData();
  }

  ionViewDidLeave() {
    this.searchValue = '';
    this.searchResults = [];
    this.searchBar.value = '';
  }

  async checkFirstRun() {
    await Storage.get({
      key: 'bar_first_time'
    }).then((val) => {
      if (val.value !== null) {
        console.log('Not visiting bar for the first time');
      } else {
        this.modalService.presentBarFirstStartupTour();
        Storage.set({
          key: 'bar_first_time',
          value: 'done'
        });
      }
    });
  }

  async tryReconnect() {
    this.loaded = false;
    setTimeout(() => {
      this.setData();
    }, 2000);
  }

  toggleIngredient(ingredient: string) {
    if (this.toggledIngredients.includes(ingredient)) {
      this.toggledIngredients.splice(this.toggledIngredients.indexOf(ingredient), 1);
    } else {
      this.toggledIngredients.push(ingredient);
    }
    if (this.toggledIngredients.length > 0 && this.toggledIngredients.length <= 3) {
      this.params = this.getSearchParams();
    }
  }

  async addToShoppingList() {
    await this.toggledIngredients.forEach(x => this.shoppingService.addShoppingItem(x, true));
    this.toastService.presentToast('Added to shopping list!', 800);
    this.toggledIngredients = [];
  }

  async removeFromBar() {
    await this.toggledIngredients.forEach(x => this.virtualBarService.removeIngredient(x));
    this.setData();
  }

  clearSelection() {
    this.toggledIngredients = [];
  }

  getSearchParams(): string {
    let params = '';
    for (const ingredient of this.toggledIngredients) {
      params += ingredient;
      if (ingredient !== this.toggledIngredients[this.toggledIngredients.length - 1]) {
        params += ',';
      }
    }
    return params;
  }

  handleSearch(event) {
    this.searchValue = event.target.value;

    if (event.target.value.length >= 2) {
      this.searchResults = this.searchService.search(event.target.value);
    } else {
      this.searchResults = [];
      this.setData();
    }
  }

  clearSearch() {
    this.searchResults = [];
    this.setData();
  }

  getSelected() {
    return `${this.toggledIngredients.length} ${this.toggledIngredients.length === 1 ? 'ingredient' : 'ingredients'} selected`;
  }

  async setData() {
    // empty everything
    this.loaded = false;
    this.fruitList = [];
    this.alcoholicList = [];
    this.otherList = [];
    this.toggledIngredients = [];

    // check connection
    if (!this.connectionService.connected) {
      this.loaded = true;
      return;
    }


    const prom: Promise<Ingredient[]>[] = [];
    this.virtualBarService.ownedIngredients.forEach(x => prom.push(this.apiService.getIngredientByName(x).toPromise()));

    const res = await Promise.all(prom);

    res.forEach(y => y.forEach(ingredient => {
      if (ingredient.strType !== null
        && ingredient.strType.toLowerCase() === 'fruit') {
        if (!this.fruitList.includes(ingredient.strIngredient)) {
          this.fruitList.push(ingredient.strIngredient);
        }
      } else if (ingredient.strAlcohol !== null
        && ingredient.strAlcohol.toLowerCase() === 'yes') {
        if (!this.alcoholicList.includes(ingredient.strIngredient)) {
          this.alcoholicList.push(ingredient.strIngredient);
        }
      } else {
        if (!this.otherList.includes(ingredient.strIngredient)) {
          this.otherList.push(ingredient.strIngredient);
        }
      }
    }));
    this.loaded = true;
  }
}
