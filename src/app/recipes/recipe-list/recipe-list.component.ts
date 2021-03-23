import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  rcSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.rcSubscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.rcSubscription.unsubscribe();
  }
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
