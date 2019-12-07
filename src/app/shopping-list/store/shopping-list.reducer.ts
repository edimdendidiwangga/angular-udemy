import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      break;
  
    default:
      return state;
      break;
  }
}