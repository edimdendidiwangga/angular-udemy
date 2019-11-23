import { Recipe } from './recipes.model';

export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is simply a test', 'https://www.justataste.com/wp-content/uploads/2018/01/beef-cornstarch-580x380.jpg'),
    new Recipe('Test Recipe2', 'This is simply a test2', '../../../assets/lala.jpg')
  ];
  
  getRecipes() {
    return this.recipes;
  }
}