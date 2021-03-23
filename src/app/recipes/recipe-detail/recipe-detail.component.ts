import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shipping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  recipeIndex: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      this.store
        .select('recipes')
        .pipe(
          map(appState => {
            return appState.recipes.find((recipe, index) => {
              return index === this.recipeIndex;
            });
          })
        )
        .subscribe(recipe => {
          this.selectedRecipe = recipe;
        });
      // this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
    });
  }

  onShoppingListAdd() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.selectedRecipe.ingredients)
    );
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeIndex));
    //this.recipeService.deleteRecipe(this.recipeIndex);
    //this.router.navigate(['/recipe']);
  }
}
