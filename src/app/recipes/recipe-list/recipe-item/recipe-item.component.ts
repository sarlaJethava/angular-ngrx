import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  recipe: Recipe;
  @Input() index: number;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('recipes')
      .pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.index;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }
}
