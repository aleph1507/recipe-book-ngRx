import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              public authService: AuthService){ }

  onSaveData(){
    // this.dataStorageService.storeRecipes()
    //     .subscribe(
    //       (response: HttpEvent<Object>) => {
    //         console.log(response.type === HttpEventType.Response);
    //       }
    //     );

    this.dataStorageService.storeRecipes()
        .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }


}
