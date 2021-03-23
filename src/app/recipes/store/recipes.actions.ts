import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Get Recipes';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const STORE_RECIPES = '[Recipe] Store Recipes';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const ADD_RECIPE = '[Recipe] Add Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { recipe: Recipe; index: number }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;
