import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipesModule } from './recipes/recipe.module';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then((m: any) => m.ModuleName) },
  { path: 'auth', loadChildren: () => import('./auth/auth.modules').then((m: any) => m.ModuleName) },

  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  // {
  //   path: 'shopping-list',
  //   loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  // },
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#AuthModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
