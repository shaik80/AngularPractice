import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  _viewUserUrl = `http://localhost:5000/ViewUsers/`;

  constructor(private http: HttpClient) {}

  viewUsers() {
    return this.http.get<any>(this._viewUserUrl);
  }

  viewOneUser() {
    return this.http.get<any>(this._viewUserUrl);
  }
}
