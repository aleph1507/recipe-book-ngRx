import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('RAW ORANGE AND BLUEBERRY "CHEESECAKE"',
      'One Green Planet',
      'https://i2.wp.com/www.onegreenplanet.org/wp-content/uploads/2012/11/Raw-Orange-and-Blueberry-Cheesecake.jpg?fit=600%2C400&ssl=1',
      [
        new Ingredient('cups raw nuts', 2),
        new Ingredient('cup dates or raisins', 1)
      ]),
      new Recipe('Raw Summer Superfood Cake',
        'Be Good Organics',
        'https://cdn.shopify.com/s/files/1/0213/3874/files/IMG_2512_2048x2048.JPG?7403',
        [
          new Ingredient('brazil nuts', 1.5),
          new Ingredient('sunflower seeds', 1)
        ])
  ];

  constructor(){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

}
