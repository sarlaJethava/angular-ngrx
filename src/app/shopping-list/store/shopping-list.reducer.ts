import * as shoppingListActions from './shipping-list.actions';
import { Ingridients } from '../../shared/Ingridients';

export interface State {
  ingredients: Ingridients[];
  updatedIngredient: Ingridients;
  updatedIngredientIndex: number;
}

const initialState = {
  ingredients: [new Ingridients('Apple', 5), new Ingridients('Tometoes', 15)],
  updatedIngredient: null,
  updatedIngredientIndex: -1
};
export function shoppingListReducer(
  state: State = initialState,
  action: shoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case shoppingListActions.EDIT_INGREDIENT:
      const ingridient = state.ingredients[state.updatedIngredientIndex];
      const updatedIngredient = {
        ...ingridient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.updatedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex != state.updatedIngredientIndex;
        })
      };
    case shoppingListActions.START_EDIT:
      return {
        ...state,
        updatedIngredientIndex: action.payload,
        updatedIngredient: { ...state.ingredients[action.payload] }
      };
    case shoppingListActions.STOP_EDIT:
      return {
        ...state,
        updatedIngredientIndex: -1,
        updatedIngredient: null
      };
    default:
      return state;
  }
}
