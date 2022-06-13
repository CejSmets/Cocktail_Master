import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Drink} from '../../../datatypes/drink';
import {DrinkComplete} from '../../../datatypes/drinkComplete';
import {DrinkService} from '../../services/drink.service';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.page.html',
  styleUrls: ['./ingredient-search.page.scss'],
})
export class IngredientSearchPage implements OnInit {
  ingredientCount: number;
  loaded: boolean;
  drinks: Drink[] = [];
  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService, public drinkService: DrinkService) { }

  async ngOnInit() {
    this.setData();
  }

  async setData() {
    this.loaded = false;

    const params = this.activatedRoute.snapshot.paramMap.get('params');
    const apiCall = this.apiService.getDrinksByIngredient(params);
    const drinks = await apiCall;

    // API returns string instead of DrinkComplete[] if nothing is found
    // @ts-ignore
    if (drinks[0] === 'N') {
      this.loaded = true;
      return;
    }
    // make all drinkById calls at the same time
    const getDrinks: Promise<DrinkComplete[]>[] = [];
    drinks.forEach(d => getDrinks.push(this.apiService.getDrinkById(d.idDrink)));

    const drinkList = await Promise.all(getDrinks);

    // put results in list
    drinkList.forEach(x => {
      this.drinks.push(new Drink({
        name: x[0].strDrink,
        tags: x[0].strTags,
        id: x[0].idDrink,
        category: x[0].strCategory,
        alcoholic: x[0].strAlcoholic,
        glass: x[0].strGlass,
        instructions: x[0].strInstructions,
        thumbnail: x[0].strDrinkThumb,
        ingredientList: this.drinkService.getIngredients(x[0]),
        measureList: this.drinkService.getMeasures(x[0])
      }));
    });

    // show list
    this.loaded = true;
  }

}
