import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseSata {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0UOLktJu-uyhmkRzuA91Rsp5ZWMF6DQs';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseSata>(this.baseUrl, { email, password, returnSecureToken: true })
      .pipe(
        catchError((errorRes) => {
          let errorMsg = errorRes.error.error.message || 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
          }
          if (/EMAIL_EXISTS/g.test(errorMsg)) {
            errorMsg = 'This email exists already';
          }
          if (/WEAK_PASSWORD/g.test(errorMsg)) {
            errorMsg = 'Password should be at least 6 characters';
          }
          return throwError(errorMsg)
        })
      );
  }
}