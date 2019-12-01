import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipes.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl(token) { return 'https://myapps-2c658.firebaseio.com/recipes.json' + token };

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.baseUrl(''), recipes).subscribe((response) => {
      console.log('data', response)
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap((user) => {
      console.log('user', user)
      return this.http
        .get<Recipe[]>(this.baseUrl(''), { params: new HttpParams().set('auth', user.token) })
    }),
      map((recipes) => {
        console.log(recipes)
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      })
    );
  }
}