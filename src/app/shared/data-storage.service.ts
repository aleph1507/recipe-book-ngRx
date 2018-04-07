import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService){}

  storeRecipes(){
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
      }
    );

    return this.httpClient.request(req);
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
            {
              observe: 'body', //default
              responseType: 'json', //default
              // params: new HttpParams().set('auth', token)
            })
            .map(
              (recipes) => {
                for(let recipe of recipes){
                  if(!recipe['ingredients']){
                    console.log(recipe);
                    recipe['ingredients'] = [];
                  }
                }
                return recipes;
                // return [];
              }
            )
            .subscribe(
              (recipes: Recipe[]) => {
                // const recipes: Recipe[] = response.json();
                this.recipeService.setRecipes(recipes);
              }
            );
  }
}
