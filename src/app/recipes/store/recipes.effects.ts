import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-complete-guide-95350-default-rtdb.firebaseio.com/recipes.json'
      );
    }),
    map(response => {
      return response.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(
        'https://ng-complete-guide-95350-default-rtdb.firebaseio.com/recipes.json',
        recipeState.recipes
      );
    })
  );

  @Effect({ dispatch: false })
  onDelete = this.actions$.pipe(
    ofType(RecipesActions.DELETE_RECIPE),
    tap(() => {
      this.router.navigate(['/recipe']);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
