import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class IssuesService {
  _viewUserIssueUrl = `http://localhost:5000/UserViewIssue/`;
  _viewOneIssue = `http://localhost:5000/ViewOneIssue/`;
  _addIssue = `http://localhost:5000/AddIssue/`;
  _addMessageUrl = `http://localhost:5000/AddMessage/`;

  constructor(private http: HttpClient) {}
  viewUserIssue() {
    return this.http.get<any>(this._viewUserIssueUrl);
  }
  viewOneIssue(id: string) {
    return this.http.get<any>(this._viewOneIssue + id);
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
}
