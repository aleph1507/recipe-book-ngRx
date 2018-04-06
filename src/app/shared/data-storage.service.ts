import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService){}

  storeRecipes(){
    // const token = this.authService.getToken();
    // console.log("getRecipes:");
    // console.log(this.recipeService.getRecipes);
    // return this.httpClient.put('https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
    //               this.recipeService.getRecipes(), {
    //                 observe: 'body',
    //                 // headers: new HttpHeaders().set('Authorization', 'asdasd')
    //                 params: new HttpParams().set('auth', token)
    //               }
    // );

    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
        // params: new HttpParams().set('auth', token)
      }
    );

    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();

    // console.log('token');
    // console.log(token);

    // return this.httpClient.get<Recipe[]>('https://ng-recipe-book-88c25.firebaseio.com/recipes.json?auth=' + token)

    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-88c25.firebaseio.com/recipes.json',
            {
              observe: 'body', //default
              responseType: 'json', //default
              // params: new HttpParams().set('auth', token)
            })
            .map(
              (recipes) => {
                // console.log('respose: ');
                // console.log(recipes);
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
