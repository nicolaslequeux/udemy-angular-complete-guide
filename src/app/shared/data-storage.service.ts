import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    // option #1 - I can return the Observable and subscribe from a component
    // return this.http.put(
    //   'https://udemy-angular-recipe-app-65a50-default-rtdb.europe-west1.firebasedatabase.app/recipe.json',
    //   recipes
    // );
    // option #2 - I can subscribe directrly from the service
    this.http
      .put(
        'https://udemy-angular-recipe-app-65a50-default-rtdb.europe-west1.firebasedatabase.app/recipe.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        'https://udemy-angular-recipe-app-65a50-default-rtdb.europe-west1.firebasedatabase.app/recipe.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
