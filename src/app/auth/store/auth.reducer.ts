import { User } from '../user.model'
import * as AuthActions from './auth.actions'

export interface State {
  user: User;
}

const initialState = {
  user: null,
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { payload } = action
      const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
      return {
        ...state,
        user
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      break;
  }
}