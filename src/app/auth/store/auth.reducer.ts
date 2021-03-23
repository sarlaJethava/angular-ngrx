import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  AuthError: string;
  IsLaoding: boolean;
}
const initialState = {
  user: null,
  AuthError: null,
  IsLaoding: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationIn
      );
      return {
        ...state,
        user: user,
        IsLaoding: false,
        AuthError: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        IsLaoding: true,
        AuthError: null
      };
    case AuthActions.AUTH_FAILED:
      return {
        ...state,
        user: null,
        IsLaoding: false,
        AuthError: action.payload
      };
    case AuthActions.HANDLE_ERROR:
      return {
        ...state,
        AuthError: null
      };
    default:
      return state;
  }
}
