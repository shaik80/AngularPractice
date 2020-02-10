import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerUserData = {};
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        this.toastr.success("Registeration sucessful", "", {
          positionClass: "toast-bottom-full-width"
        });

        console.log(res);
        localStorage.setItem("token", res.token);
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
