import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestURL} from "../shared/RestURL";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<any>(RestURL.login, user);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  setAuthToken(token: string | null | undefined): void {
    if (token) {
      window.localStorage.setItem('auth_token', token);
    }
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('auth_token')) {
      return true;
    } else {
      return false;
    }
  }

}
