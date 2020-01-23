import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _registerUrl = `http://localhost:5000/register`;
  private _loginUrl = `http://localhost:5000/login`;
  private _viewUserUrl = `http://localhost:5000/ViewUsers/`;
  private _viewUserIssueUrl = `http://localhost:5000/UserViewIssue/`;
  private _viewOneIssue = `http://localhost:5000/ViewOneIssue/`;
  private _addIssue = `http://localhost:5000/AddIssue/`;
  private _addMessageUrl = `http://localhost:5000/AddMessage/`;

  constructor(private http: HttpClient) {}

  registerUser(user: {}) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: {}) {
    return this.http.post<any>(this._loginUrl, user);
  }

  viewUserIssue() {
    return this.http.get<any>(this._viewUserIssueUrl + this.getId());
  }
  viewOneIssue(id: string) {
    return this.http.get<any>(this._viewOneIssue + id);
  }
  viewOneUser() {
    return this.http.get<any>(this._viewUserUrl + this.getId());
  }
  viewUsers() {
    return this.http.get<any>(this._viewUserUrl);
  }
  addIssue(issue: {}) {
    return this.http.post<any>(this._addIssue, issue);
  }
  addMessage(message: any, username: any, id: any) {
    return this.http.post<any>(
      this._addMessageUrl + username + "/" + id,
      message
    );
  }
  loggedIn() {
    return !!localStorage.getItem("token");
  }
  setId(Id: string) {
    return localStorage.setItem("id", Id);
  }

  getId() {
    return localStorage.getItem("id");
  }

  loggedOut() {
    return localStorage.removeItem("token");
  }

  setToken(token: string) {
    return localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
}
