import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { ViewissueService } from "../../services/issue/viewissue.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

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
    private _viewIssue: ViewissueService,
    private toastr: ToastrService,
    private _location: Location
  ) {}

  issueid: any;
  UserDetails: any;
  issuedetails: any;
  issueMessage: any;
  ngOnInit() {
    this.getUsername();
    this.getIssueDetails();
    // this.issueid = this._viewIssue.getData();
  }

  getUsername() {
    this._auth.viewOneUser().subscribe(
      res => {
        this.UserDetails = res;
        console.log(res);
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

  getIssueDetails() {
    this.getIdFromUrl();
    this._auth.viewOneIssue(this.issueid).subscribe(
      res => {
        if (res.name == "CastError") {
          this._router.navigate(["/dashboard"]);
        } else {
          this.issuedetails = res[0];
          this.issueMessage = res[0].message;
          console.log(res[0]);
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
  addMessage(data: any) {
    this._auth
      .addMessage(data, this.UserDetails.username, this.issueid)
      .subscribe(
        res => {
          this.toastr.success("Registeration sucessful", "", {
            positionClass: "toast-top-full-width"
          });
          console.log(res);
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
          console.log(err);
        }
      );
    console.log(data);
  }
}
