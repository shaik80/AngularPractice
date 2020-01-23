import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-issues",
  templateUrl: "./view-issues.component.html",
  styleUrls: ["./view-issues.component.css"]
})
export class ViewIssuesComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}
  issue: any;
  ngOnInit() {
    this._auth.viewUserIssue().subscribe(
      res => {
        this.issue = res;
        console.log(res);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/login"]);
          }
        }
      }
    );
  }

  goToAddMessage(id: string) {
    this._router.navigate(["/addMessage", id]);
  }
}
