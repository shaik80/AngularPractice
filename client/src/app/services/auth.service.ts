import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/register";
  private _loginUrl = "http://localhost:5000/login";

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
    // return console.log(localStorage.getItem("token"));
  }

  getToken() {
    return console.log(localStorage.getItem("token"));
  }
}
