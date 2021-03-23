import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipesEffects } from './recipes/store/recipes.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
