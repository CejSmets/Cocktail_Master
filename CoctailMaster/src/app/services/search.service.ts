import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ingredientList: string[] = [];
  constructor(public apiService: ApiService) {
    this.initIngredients();
  }

  async initIngredients() {
    const ingredients = await this.apiService.getAllIngredients();
    ingredients.forEach(x => this.ingredientList.push(x.strIngredient1));
  }

  search(searchValue: string): string[] {
    return this.ingredientList.filter(x => x.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
