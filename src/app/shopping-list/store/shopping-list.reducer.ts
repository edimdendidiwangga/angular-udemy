import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.action';

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}
export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredients = state.ingredients
      updatedIngredients[action.payload.index] = action.payload.ingredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, index) => index !== action.payload)
      };
    default:
      return state;
  }
}