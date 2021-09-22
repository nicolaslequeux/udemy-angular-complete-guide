import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Schnitzel',
    //   'This is a test description',
    //   'https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
    //   [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    // ),
    // new Recipe(
    //   'Big Fat Burger',
    //   'This is a test description 2',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/990402-ians-recipe-01-IMG_4724.jpg/1600px-990402-ians-recipe-01-IMG_4724.jpg',
    //   [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 2),
    //     new Ingredient('French Fries', 20),
    //   ]
    // ),
  ];


  constructor(private shoppingListService: ShoppingListService) {}

  // Method to overight our recipes
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // return [...this.recipes];
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
