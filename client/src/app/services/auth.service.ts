import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  _registerUrl = `http://localhost:5000/register`;
  _loginUrl = `http://localhost:5000/login`;

  constructor(private http: HttpClient) {}

  registerUser(user: {}) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: {}) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  loggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    return true;
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    return true;
  }
  getToken() {
    return localStorage.getItem("token");
  }
}
