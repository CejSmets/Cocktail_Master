import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CocktailApiResult} from '../../datatypes/cocktailApiResult';
import {DrinkComplete} from '../../datatypes/drinkComplete';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ingredient} from '../../datatypes/ingredient';
import {IngredientApiResult} from '../../datatypes/ingredientApiResult';
import {Category} from '../../datatypes/category';
import {IngredientName} from '../../datatypes/ingredientName';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly apiKey = environment.apiKey;
  readonly baseURL = 'https://www.thecocktaildb.com/api/json/v2';
  constructor(private http: HttpClient) { }

  getPopularDrinks(): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
      `${this.baseURL}/${this.apiKey}/popular.php`,{
        observe: 'body',
        responseType: 'json'
      }
    )
      .pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getRandomDrinks(): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
        `${this.baseURL}/${this.apiKey}/randomselection.php`,{
          observe: 'body',
          responseType: 'json'
        }
      )
      .pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getDrinksByIngredient(ingredientString: string): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
        `${this.baseURL}/${this.apiKey}/filter.php?i=${ingredientString}`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getNonalcoholicDrinks(): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
        `${this.baseURL}/${this.apiKey}/filter.php?a=non_alcoholic`, {
          observe: 'body',
          responseType: 'json'
        }
      )
      .pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getDrinkById(id: string): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
        `${this.baseURL}/${this.apiKey}/lookup.php?i=${id}`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getDrinksbyCategory(category: string): Promise<DrinkComplete[]> {
    return this.http
      .get<CocktailApiResult<DrinkComplete>>(
        `${this.baseURL}/${this.apiKey}/filter.php?c=${category}`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<CocktailApiResult<DrinkComplete>, DrinkComplete[]>(o => o.drinks)
      ).toPromise();
  }

  getIngredientByName(ingredient: string): Observable<Ingredient[]> {
    return this.http
      .get<IngredientApiResult<Ingredient>>(
        `${this.baseURL}/${this.apiKey}/search.php?i=${ingredient}`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<IngredientApiResult<Ingredient>, Ingredient[]>(o => o.ingredients)
      );
  }

  getAllIngredients(): Promise<IngredientName[]> {
    return this.http
      .get<CocktailApiResult<IngredientName>>(
        `${this.baseURL}/${this.apiKey}/list.php?i=list`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<CocktailApiResult<IngredientName>, IngredientName[]>(o => o.drinks)
      ).toPromise();
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CocktailApiResult<Category>>(
        `${this.baseURL}/${this.apiKey}/list.php?c=list`, {
          observe: 'body',
          responseType: 'json'
        }
      ).pipe(
        map<CocktailApiResult<Category>, Category[]>(o => o.drinks)
      );
  }
}
