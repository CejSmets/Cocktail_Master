import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Drink} from '../../datatypes/drink';
import {DrinkService} from '../services/drink.service';
import {DrinkComplete} from '../../datatypes/drinkComplete';

@Component({
  selector: 'app-drinkdetail',
  templateUrl: './drinkdetail.page.html',
  styleUrls: ['./drinkdetail.page.scss'],
})
export class DrinkdetailPage implements OnInit {
  drinkId;
  drinks: DrinkComplete[];
  isLoaded = false;
  constructor(public apiService: ApiService, public drinkService: DrinkService) {

  }

  async ngOnInit() {
    await this.setData();
    this.isLoaded = true;
  }

  async setData() {
    this.drinks = await this.apiService.getDrinkById(this.drinkId);
  }

}
