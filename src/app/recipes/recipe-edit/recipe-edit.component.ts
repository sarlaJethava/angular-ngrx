import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeId;
  editMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = params['id'] != null;

      this.bindForm();
    });
  }
  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this.store.dispatch(
          new RecipesActions.UpdateRecipe({
            recipe: this.recipeForm.value,
            index: this.recipeId
          })
        );
        //  this.recipeService.editRecipe(this.recipeId, this.recipeForm.value);
      } else {
        this.store.dispatch(
          new RecipesActions.AddRecipe(this.recipeForm.value)
        );
        // this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.recipeForm.reset();
      this.onCancel();
    }
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onIngredientRemove(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private bindForm() {
    debugger;
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngradients = new FormArray([]);
    let recipe;
    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(
          map(appState => {
            return appState.recipes.find((recipe, index) => {
              return index === this.recipeId;
            });
          })
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          if (recipe['ingredients']) {
            for (let ingItem of recipe.ingredients) {
              recipeIngradients.push(
                new FormGroup({
                  name: new FormControl(ingItem.name, Validators.required),
                  amount: new FormControl(ingItem.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
      //const recipe = this.recipeService.getRecipe(this.recipeId);
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients: recipeIngradients
    });
  }
  getIngradientControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
