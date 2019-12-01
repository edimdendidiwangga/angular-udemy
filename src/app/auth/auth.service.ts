import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

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
    return this.http.post<AuthResponseSata>(this.baseUrl, { email, password, returnSecureToken: true });
  }
}