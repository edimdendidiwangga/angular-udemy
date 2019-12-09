import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl(token) { return 'https://myapps-2c658.firebaseio.com/recipes.json' + token };

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.baseUrl(''), recipes).subscribe((response) => {
      console.log('data', response)
    });
  }

  fetchRecipes() {
    
    return this.http
      .get<Recipe[]>(this.baseUrl(''))
        .pipe(
          map((recipes) => {
            console.log(recipes)
            return recipes.map(recipe => {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
          }),
          tap(recipes => {
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
          })
        );
  }
}