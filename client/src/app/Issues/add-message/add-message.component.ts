import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { IssuesService } from "../../services/issue/issues.service";
import { UsersService } from "../../services/users/users.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { Config } from "../../utils/editorConfig";

@Component({
  selector: "app-add-message",
  templateUrl: "./add-message.component.html",
  styleUrls: ["./add-message.component.css"]
})
export class AddMessageComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private _issues: IssuesService,
    private _users: UsersService,
    private _location: Location
  ) {}

  public editorConfig = Config;
  //total Character's in editor
  totalChar = 0;
  // colors based on progress bar
  bgColor: string;
  // to move progress bar
  progreeBarMoves: number;
  // To store Issue Id present in URL
  issueid: any;
  // To store User,Issue and messgae details present in database
  UserDetails: any;
  issuedetails: any;
  issueMessage: any;

  // function to count Character in editor
  countChar(parsedHtml: Document) {
    this.totalChar = parsedHtml.body.innerText.length;
    this.progreeBarMoves = parsedHtml.body.innerText.length / 5;
    this.totalChar <= 50
      ? (this.bgColor = "progress-bar progress-bar-striped bg-info")
      : this.totalChar <= 250
      ? (this.bgColor = "progress-bar progress-bar-striped bg-success")
      : this.totalChar <= 400
      ? (this.bgColor = "progress-bar progress-bar-striped bg-warning")
      : this.totalChar <= 450
      ? (this.bgColor = "progress-bar progress-bar-striped bg-danger")
      : this.totalChar > 500
      ? this.toastr.warning("you have exceeded more than 500 characters", "", {
          positionClass: "toast-top-full-width"
        })
      : null;
  }

  // on change event when typing message
  onModelChange(textValue: string): void {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(textValue, "text/html");
    this.countChar(parsedHtml);
  }

  ngOnInit() {
    this.getUsername();
    this.getIssueDetails();
  }

  // Getting user details
  getUsername() {
    this._users.viewOneUser().subscribe(
      res => {
        this.UserDetails = res;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/dashboard"]);
          }
        }
      }
    );
  }

  // Getting issue details
  getIssueDetails() {
    this.getIdFromUrl();
    this._issues.viewOneIssue(this.issueid).subscribe(
      res => {
        // if there is any error then show me the dashboard
        // else get message's and user details
        if (res.name == "CastError") {
          this._router.navigate(["/dashboard"]);
        } else {
          this.issuedetails = res;
          this.issueMessage = res.message;
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/dashboard"]);
          }
        }
      }
    );
  }

  // get Issueid from url then store into issueid
  getIdFromUrl() {
    this._activatedRoute.paramMap.subscribe(
      params => {
        if (params.get("id") == "") {
          this._router.navigate(["/dashboard"]);
        } else {
          this.issueid = params.get("id");
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(["/dashboard"]);
          }
        }
      }
    );
  }

  // to store messages into database
  addMessage(data: any) {
    this._issues
      .addMessage(data, this.UserDetails.username, this.issueid)
      .subscribe(
        res => {
          this.toastr.success("Message added sucessful", "", {
            positionClass: "toast-top-full-width"
          });
          this.getIssueDetails();
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              this.toastr.error(err.error.errors[0].msg, "", {
                positionClass: "toast-bottom-full-width"
              });
              console.log(err.error.errors[0].msg);
            } else if (err.status === 500) {
              this.toastr.error(err.error, "", {
                positionClass: "toast-bottom-full-width"
              });
            }
          }
        }
      );
  }
}
