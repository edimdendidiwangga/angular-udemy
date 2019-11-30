import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl = 'https://myapps-2c658.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log('data', response)
    });
  }
}