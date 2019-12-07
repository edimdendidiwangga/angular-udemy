
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredients.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    // new Recipe(
    //   'Test Recipe', 'This is simply a test', 'https://www.justataste.com/wp-content/uploads/2018/01/beef-cornstarch-580x380.jpg',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20),
    //   ]
    // ),
    // new Recipe('Test Recipe2', 'This is simply a test2', '../../../assets/lala.jpg',
    //   [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 1),
    //   ]
    // )
  ];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
  
  getRecipes() {
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients)
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }
}