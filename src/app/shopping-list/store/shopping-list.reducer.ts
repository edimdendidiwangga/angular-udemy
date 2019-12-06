import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';
import * as ActionsTypes from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

export function shoppingListReducer(state = initialState, action: ActionsTypes.AddIngredient) {
  switch (action.type) {
    case ActionsTypes.ADD_INGREDIENT:
      state.ingredients.push()
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      break;
  
    default:
      break;
  }
}