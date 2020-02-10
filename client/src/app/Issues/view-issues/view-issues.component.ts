import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { IssuesService } from "../../services/issue/issues.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-issues",
  templateUrl: "./view-issues.component.html",
  styleUrls: ["./view-issues.component.css"]
})
export class ViewIssuesComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _issues: IssuesService
  ) {}

  // To store all user Issues
  issue: any;

  // Default Customise View
  CreatedDate = true;
  Description = true;
  Severity = true;
  Status = true;
  ResolvedDate = true;

  // Default Filter
  SeverityFilter = `All`;
  StatusFilter = `All`;

  ngOnInit() {
    // get all user issues
    this._issues.viewUserIssue().subscribe(
      res => {
        this.issue = res;
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

  // Redirect to add message
  goToAddMessage(id: string) {
    this._router.navigate(["/addMessage", id]);
  }

  // counting the Filtered data
  countArray() {
    let count = 0;
    this.issue.forEach(issues => {
      if (this.getIssues(issues)) {
        count += 1;
      }
    });
    return count;
  }

  // getting Filtered issue details
  getIssues(issues: { Severity: string; Status: string }) {
    return (
      (issues.Severity == this.SeverityFilter ||
        this.SeverityFilter == "All") &&
      (issues.Status == this.StatusFilter || this.StatusFilter == "All")
    );
  }
}
