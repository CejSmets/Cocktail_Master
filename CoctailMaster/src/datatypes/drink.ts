export interface IDrink {
  name: string;
  tags: string;
  id: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  thumbnail: string;
  ingredientList: string[];
  measureList: string[];
}

export class Drink implements IDrink {
  name: string;
  tags: string;
  id: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  thumbnail: string;
  ingredientList: string[];
  measureList: string[];

  constructor(obj: IDrink) {
    Object.assign(this, obj);
  }
}
