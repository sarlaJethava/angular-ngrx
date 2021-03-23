import { Ingridients } from 'src/app/shared/Ingridients';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';

export const EDIT_INGREDIENT = '[Shopping List] Edit Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingridients) {}
}
export class AddIngredients {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingridients[]) {}
}
export class EditIngredients {
  readonly type = EDIT_INGREDIENT;
  constructor(public payload: Ingridients) {}
}
export class DeleteIngredients {
  readonly type = DELETE_INGREDIENT;
  constructor() {}
}
export class StartEdit {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}
export class StopEdit {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | EditIngredients
  | DeleteIngredients
  | StartEdit
  | StopEdit;
