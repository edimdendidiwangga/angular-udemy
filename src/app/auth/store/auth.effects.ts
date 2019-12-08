import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthEffects {
  baseUrl(type) {
    return `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${environment.firebaseAPIKey}`;
  }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
      .post<AuthResponseData>(
        this.baseUrl('signInWithPassword'), {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            })
          }),
          catchError(errorRes => {
            let errorMsg = errorRes.error.error.message || 'An unknown error occured!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LoginFailed(errorMsg))
            }
            if (/EMAIL_NOT_FOUND/g.test(errorMsg)) {
              errorMsg = 'This email does not exist.';
            }
            if (/INVALID_PASSWORD/g.test(errorMsg)) {
              errorMsg = 'This Password is noerrort correct.';
            }
            if (/EMAIL_EXISTS/g.test(errorMsg)) {
              errorMsg = 'This email exists already';
            }
            if (/WEAK_PASSWORD/g.test(errorMsg)) {
              errorMsg = 'Password should be at least 6 characters';
            }
            return of(new AuthActions.LoginFailed(errorMsg))
          })
        );
    })
  )

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}