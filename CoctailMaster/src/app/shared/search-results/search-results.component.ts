import {Component, Input, OnInit} from '@angular/core';
import {DrinkService} from '../../services/drink.service';
import {VirtualBarService} from '../../services/virtual-bar.service';
import {ShoppingService} from '../../services/shopping.service';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() searchResult: string[];
  constructor(public drinkService: DrinkService, public virtualBarService: VirtualBarService,
              public shoppingService: ShoppingService, public toastService: ToastService) { }

  ngOnInit() {}

  async addIngredient(ingredient: string) {
    console.log(ingredient);
    await this.virtualBarService.addIngredient(ingredient);
    this.toastService.presentToast('Added to cabinet!', 800);
  }

  async addToShoppingList(ingredient: string) {
    await this.shoppingService.addShoppingItem(ingredient, true);
    this.toastService.presentToast('Added to shopping list!', 800);
  }

}
