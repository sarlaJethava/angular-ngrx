import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  loginSb: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loginSb = this.store
      .select('auth')
      .pipe(
        map(authState => {
          return authState.user;
        })
      )
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }
  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
    //this.dataHandlingService.storeRecipeData();
  }
  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
    //this.dataHandlingService.fetchRecipeData().subscribe();
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }
  ngOnDestroy() {
    this.loginSb.unsubscribe();
  }
}
