import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/register";
  private _loginUrl = "http://localhost:5000/login";
  private _dashboadUrl = "http://localhost:5000/dashboard";

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  dashboard() {
    return this.http.get<any>(this._dashboadUrl);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
    // return console.log(localStorage.getItem("token"));
  }

  setToken(token) {
    return localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
}
