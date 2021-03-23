import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable()
export class AuthEffects {
  handleAuthentication = (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthSuccess({
      email: email,
      userId: userId,
      token: token,
      expirationIn: expirationDate,
      redirect: true
    });
  };

  handleError = (errorRes: any) => {
    let errorMessage = 'un unKnown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthFailed(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email is already exist';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'Invalid username!';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'Invalid password!';
        break;
      }
    }
    return of(new AuthActions.AuthFailed(errorMessage));
  };

  @Effect()
  authSigninup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<authResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setAutologout(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          }),
          catchError(errorRes => {
            return this.handleError(errorRes);
          })
        );
    })
  );
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<authResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setAutologout(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          }),
          catchError(errorRes => {
            return this.handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authAutologin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        userId: string;
        _token: string;
        expirationIn: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'Dummy' };
      }
      const user = new User(
        userData.email,
        userData.userId,
        userData._token,
        new Date(userData.expirationIn)
      );

      const timeDuration =
        new Date(userData.expirationIn).getTime() - new Date().getTime();
      this.authService.setAutologout(timeDuration);
      if (user.token) {
        return new AuthActions.AuthSuccess({
          email: userData.email,
          userId: userData.userId,
          token: userData._token,
          expirationIn: new Date(userData.expirationIn),
          redirect: false
        });
      }
      return { type: 'Dummy' };
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearAutologout();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private authService: AuthService
  ) {}
}
