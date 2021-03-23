import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  storeSb: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.storeSb = this.store.select('auth').subscribe(authData => {
      this.isLoading = authData.IsLaoding;
      this.error = authData.AuthError;
    });
    this.loadLoginForm();
  }
  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let observableLg: Observable<authResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
      //observableLg = this.authService.login(email, password);
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
    this.loginForm.reset();
  }
  ngOnDestroy() {
    this.storeSb.unsubscribe();
  }
  onHandleError() {
    this.store.dispatch(new AuthActions.HandleError());
  }
  private loadLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
}
