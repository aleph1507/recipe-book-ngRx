import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";

export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
              {
                observe: 'body', //default
                responseType: 'json', //default
                // params: new HttpParams().set('auth', token)
              })

    }).map(
      (recipes) => {
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    )


  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}
}
