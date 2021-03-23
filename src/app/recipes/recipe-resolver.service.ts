import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );

    // const recipes = this.recipeService.getServices();
    // if (recipes.length == 0) {
    //   return this.dataHandlingService.fetchRecipeData();
    // }
    // return recipes;
  }
}
