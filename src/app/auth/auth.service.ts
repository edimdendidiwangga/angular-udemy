import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  baseUrl(type) {
    return `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=AIzaSyD0UOLktJu-uyhmkRzuA91Rsp5ZWMF6DQs`;
  }

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseSata>(this.baseUrl('signUp'), { email, password, returnSecureToken: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseSata>(this.baseUrl('signInWithPassword'), { email, password, returnSecureToken: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = errorRes.error.error.message || 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    if (/EMAIL_NOT_FOUND/g.test(errorMsg)) {
      errorMsg = 'This email not found';
    }
    if (/INVALID_PASSWORD/g.test(errorMsg)) {
      errorMsg = 'Password is Wrong';
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