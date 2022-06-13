export interface IShoppingItem {
  text: string;
  isIngredient: boolean;
}

export class ShoppingItem {
  text: string;
  isIngredient: boolean;
  constructor(obj: IShoppingItem) {
    Object.assign(this, obj);
  }
}
