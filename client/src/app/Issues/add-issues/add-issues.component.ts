import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-issues",
  templateUrl: "./add-issues.component.html",
  styleUrls: ["./add-issues.component.css"]
})
export class AddIssuesComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  description: string;
  newDate: any;
  issues: any;
  status = "Open";
  severity = "Minor";
  users: any;
  userArray: any;
  allUsers: any;
  dropdownSettings = {};
  selectedUsers: Map<string, Array<any>>;
  ngOnInit() {
    this.getUserDetails();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "_id",
      textField: "username",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      onDeSelect: "UnSelect",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    console.log(this.selectedUsers);
  }

  addNew(data: any) {
    console.log(data);
    let keys = Array.from(this.selectedUsers.keys());
    console.log(keys);
    data["Users"] = keys;
    this._auth.addIssue(data).subscribe(
      res => {
        this.toastr.success("Registeration sucessful", "", {
          positionClass: "toast-top-full-width"
        });
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
        console.log(err);
      }
    );
  }
  onItemSelect(item: any) {
    this.selectedUsers.set(item._id, item.username);
    console.log(item);
    console.log(this.selectedUsers);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelect(item: any) {
    this.selectedUsers.delete(item._id);
    console.log(this.selectedUsers);
  }
  getUserDetails() {
    this._auth.viewUsers().subscribe(
      res => {
        this.selectedUsers = new Map<string, Array<any>>();
        this.allUsers = res;
        console.log(res);
      },
      err => {}
    );
  }
}
