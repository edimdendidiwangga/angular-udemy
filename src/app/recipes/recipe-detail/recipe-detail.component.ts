import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => index === this.id)
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      })
    
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });

  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    this.router.navigate(['/recipes']);
  }

}
