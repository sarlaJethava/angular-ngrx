import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingridients } from 'src/app/shared/Ingridients';
import * as ShoppingListActions from '../store/shipping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editIngId: number;
  editedItem: Ingridients;
  slSubscriber: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.slSubscriber = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.updatedIngredientIndex > -1) {
          this.editMode = true;
          this.editIngId = stateData.updatedIngredientIndex;
          this.editedItem = stateData.updatedIngredient;
          this.bindData();
        } else {
          this.editMode = false;
        }
      });
    // this.slSubscriber = this.shoppingListService.ingredientEdited.subscribe(
    //   (index: number) => {
    //     this.editIngId = index;
    //     this.editMode = true;
    //     this.bindData();
    //   }
    // );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngridient = new Ingridients(value.name, value.amount);
    if (!this.editMode) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngridient));
      //this.shoppingListService.OnItemAdded(newIngridient);
    } else {
      this.store.dispatch(
        new ShoppingListActions.EditIngredients(newIngridient)
      );
      //this.shoppingListService.OnItemEdit(this.editIngId, newIngridient);
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy() {
    this.slSubscriber.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  bindData() {
    //this.editedItem = this.shoppingListService.getIngredient(this.editIngId);
    this.slForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount
    });
  }
  onReset() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredients());
    //this.shoppingListService.onItemDeleted(this.editIngId);
    this.onReset();
  }
}
