import { Ingredient } from '../shared/ingredients.model';
import { Action } from '@ngrx/store';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
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