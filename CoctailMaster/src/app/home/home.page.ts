import {Component, OnInit, ViewChild} from '@angular/core';
import {DrinkService} from '../services/drink.service';
import {Drink} from '../../datatypes/drink';
import {IonContent, IonFab, ModalController, PopoverController} from '@ionic/angular';
import {ApiService} from '../services/api.service';
import {ToastService} from '../services/toast.service';
import {PopoverPagePage} from '../popover-page/popover-page.page';
import {ConnectionService} from '../services/connection.service';
import {Network} from '@capacitor/network';
import {DrinkComplete} from '../../datatypes/drinkComplete';
import {ModalService} from '../services/modal.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  @ViewChild('fabRef', { static: false }) fabRef: IonFab;
  @ViewChild('content', { static: true }) content: IonContent;
  popularDrinksList: Drink[] = [];
  infiniteDrinksList: Drink[] = [];
  categoryArray: string[] = [];
  drink: Drink;
  selectedSegment = 'infinite';
  filter = 'alcoholic';
  loaded = false;

  constructor(public drinkService: DrinkService, public modalController: ModalController, public apiService: ApiService,
              public popoverController: PopoverController, public toastService: ToastService,
              public connectionService: ConnectionService, public modalService: ModalService) {
    Network.addListener('networkStatusChange', () => {
      if (this.connectionService.connected) {
        this.loaded = false;
        this.tryReconnect();
      }
    });
  }

  async ngOnInit() {
    this.setData();

    this.checkFirstRun();
  }

  async checkFirstRun() {
    await Storage.get({
      key: 'home_first_time'
    }).then((val) => {
      if (val.value !== null){
        console.log('Not visiting home for the first time');
      }
      else {
        this.modalService.presentHomeFirstStartupTour();
        Storage.set({
          key: 'home_first_time',
          value: 'done'
        });
      }
    });
  }

  async setData() {
    this.loaded = false;
    this.popularDrinksList = [];
    this.infiniteDrinksList = [];
    this.categoryArray = [];
    console.log(this.connectionService.connected);
    if (!this.connectionService.connected) {
      this.loaded = true;
      return;
    }

    const setPop = this.setPopularDrinks();
    const setInfinite = this.addInfiniteDrinks();
    const setCat = this.apiService.getCategories().forEach(x => x.forEach(c => this.categoryArray.push(c.strCategory)));
    await Promise.all([setPop, setInfinite, setCat]);
    this.loaded = true;
  }

  onSegmentChange(evt) {
    this.selectedSegment = evt.target.value;
  }

  async tryReconnect() {
    this.loaded = false;
    setTimeout(() => {
      this.setData();
    }, 2000);
  }

  async setPopularDrinks() {
    const drinks = await this.apiService.getPopularDrinks();
    drinks.forEach((d => {
      const tags = this.drinkService.getTags(d);
      const ingredientList = this.drinkService.getIngredients(d);
      const measureList = this.drinkService.getMeasures(d);
      this.popularDrinksList.push(new Drink({
        name: d.strDrink,
        tags,
        id: d.idDrink,
        category: d.strCategory,
        alcoholic: d.strAlcoholic,
        glass: d.strGlass,
        instructions: d.strInstructions,
        thumbnail: d.strDrinkThumb,
        ingredientList,
        measureList
      }));
    }));
  }

  async setFilter() {
    let tempDrinks;
    if (this.filter === 'nonalcoholic') {
      tempDrinks = await this.apiService.getNonalcoholicDrinks();
    }
    else if (this.categoryArray.some(x => x.toLowerCase() === this.filter.toLowerCase())){
      tempDrinks = await this.apiService.getDrinksbyCategory(this.filter);
    }
    else {
      return;
    }

    const prom: Promise<DrinkComplete[]>[] = [];
    tempDrinks.forEach(d => prom.push(this.apiService.getDrinkById(d.idDrink)));

    const temp = await Promise.all(prom);
    temp.forEach(a => a.forEach(drink => this.infiniteDrinksList.push(new Drink({
          name: drink.strDrink,
          tags: drink.strTags,
          id: drink.idDrink,
          category: drink.strCategory,
          alcoholic: drink.strAlcoholic,
          glass: drink.strGlass,
          instructions: drink.strInstructions,
          thumbnail: drink.strDrinkThumb,
          ingredientList: this.drinkService.getIngredients(drink),
          measureList: this.drinkService.getMeasures(drink)
        }))));
  }

  async addInfiniteDrinks() {
    const drinks = await this.apiService.getRandomDrinks();
    drinks.forEach(d => {
      if (this.filter === 'alcoholic' && d.strAlcoholic.toLowerCase() !== 'alcoholic') {
        return;
      }
      const tags = this.drinkService.getTags(d);
      const ingredientList = this.drinkService.getIngredients(d);
      const measureList = this.drinkService.getMeasures(d);
      const drinkToAdd = new Drink({
        name: d.strDrink,
        tags,
        id: d.idDrink,
        category: d.strCategory,
        alcoholic: d.strAlcoholic,
        glass: d.strGlass,
        instructions: d.strInstructions,
        thumbnail: d.strDrinkThumb,
        ingredientList,
        measureList
      });
      if (!this.infiniteDrinksList.includes(drinkToAdd)) {
        this.infiniteDrinksList.push(drinkToAdd);
      }
    });
  }

  async loadData(event) {
    setTimeout(() => {
      this.addInfiniteDrinks();
      event.target.complete();
    }, 1000);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPagePage,
      cssClass: 'popover',
      event: ev,
      translucent: true,
      reference: 'event',
    });
    popover.onDidDismiss()
      .then((data) => {
        this.filter = data.data;
        if (this.filter === undefined) {
          // catch user error
          this.loaded = true;
          return;
        }
        // alcoholic and reset logic
        else if (this.filter === 'alcoholic' || this.filter === 'none') {
          this.infiniteDrinksList = [];
          this.addInfiniteDrinks();
        }
        // else if (this.filter === 'nonalcoholic'){
        //   this.infiniteDrinksList = [];
        //   this.setFilter();
        // }
        else {
          this.infiniteDrinksList = [];
          this.setFilter();
        }
      })
      .then(() => {
        if (this.filter !== undefined) {
          this.loaded = true;
          this.scrollToTop();
          this.toastService.presentToast('Filter successfully changed', 1500);
        }
      });
    await popover.present();
    this.loaded = false;
  }

  scrollToTop() {
    this.content.scrollToTop(800);
  }
}
