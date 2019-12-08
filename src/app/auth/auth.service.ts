import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseSata {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  baseUrl(type) {
    return `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${environment.firebaseAPIKey}`;
  }

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

  autoLogin() {
    const userData: {
      email: string;
      id: string,
      _token: string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: userData.email,
        userId: userData.id,
        token: userData._token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.AuthenticateSuccess({
      email,
      userId,
      token,
      expirationDate
    }))
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user) )
  } 

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = errorRes.error.error.message || 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    if (/EMAIL_NOT_FOUND/g.test(errorMsg)) {
      errorMsg = 'This email does not exist.';
    }
    if (/INVALID_PASSWORD/g.test(errorMsg)) {
      errorMsg = 'This Password is not correct.';
    }
    if (/EMAIL_EXISTS/g.test(errorMsg)) {
      errorMsg = 'This email exists already';
    }
    if (/WEAK_PASSWORD/g.test(errorMsg)) {
      errorMsg = 'Password should be at least 6 characters';
    }
    return throwError(errorMsg)
  }
}