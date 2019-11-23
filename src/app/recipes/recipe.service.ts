import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe', 'This is simply a test', 'https://www.justataste.com/wp-content/uploads/2018/01/beef-cornstarch-580x380.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]
    ),
    new Recipe('Test Recipe2', 'This is simply a test2', '../../../assets/lala.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]
    )
  ];
  
  getRecipes() {
    return this.recipes;
  }
}