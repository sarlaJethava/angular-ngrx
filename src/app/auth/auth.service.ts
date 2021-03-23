import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loTimeout: any;
  constructor(private store: Store<fromApp.AppState>) {}

  setAutologout(timeDuration: number) {
    this.loTimeout = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, timeDuration);
  }

  clearAutologout = () => {
    if (this.loTimeout) {
      clearTimeout(this.loTimeout);
      this.loTimeout = null;
    }
  };
}
