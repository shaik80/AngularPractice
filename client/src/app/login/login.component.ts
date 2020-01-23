import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        this.toastr.success("Login sucessful", "", {
          positionClass: "toast-bottom-full-width"
        });
        this._auth.setToken(res.token);
        this._auth.setId(res.id);
        this._router.navigate(["/dashboard"]);
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
