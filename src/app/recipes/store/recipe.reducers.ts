import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){
  switch(action.type){
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      }
    default:
      return state;
  }
}
