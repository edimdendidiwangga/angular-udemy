import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';
import * as types from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      state.ingredients.push()
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      }
      break;
  
    default:
      break;
  }
}