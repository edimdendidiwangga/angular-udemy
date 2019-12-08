import { User } from '../user.model'
import * as AuthActions from './auth.actions'

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const { payload } = action
      const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
      return {
        ...state,
        user,
        authError: null,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      }
    default:
      return state;
  }
}