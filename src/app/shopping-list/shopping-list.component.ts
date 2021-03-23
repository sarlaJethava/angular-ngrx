import { Component, OnInit } from '@angular/core';
import { Ingridients } from '../shared/Ingridients';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shipping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Observable<{ ingredients: Ingridients[] }>;
  shoppingSubcription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingridients = this.store.select('shoppingList');
    // this.ingridients = this.shoppingListService.getIngredients();
    // this.shoppingSubcription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingridients: Ingridients[]) => {
    //     this.ingridients = ingridients;
    //   }
    // );
  }
  // ngOnDestroy() {
  //   this.shoppingSubcription.unsubscribe();
  // }
  onIngredientEdit(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    //this.shoppingListService.ingredientEdited.next(index);
  }
}
