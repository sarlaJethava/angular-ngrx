import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAILED = '[Auth] Auth Failed';
export const LOGOUT = '[Auth] Logout';

export const SIGNUP_START = '[Auth] Signup Start';
export const HANDLE_ERROR = '[Auth] Handle Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationIn: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;

  constructor(public payload: string) {}
}
export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class HandleError implements Action {
  readonly type = HANDLE_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export type AuthActions =
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFailed
  | SignupStart
  | HandleError;
