import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Config } from "../../utils/editorConfig";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { IssuesService } from "src/app/services/issue/issues.service";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users/users.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-add-edit-form",
  templateUrl: "./add-edit-form.component.html",
  styleUrls: ["./add-edit-form.component.css"]
})
export class AddEditFormComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _issues: IssuesService,
    private toastr: ToastrService,
    private _users: UsersService
  ) {}

  editorConfig = Config;
  // Default  selected  radio button
  issues: any;
  status = "Open";
  severity = "Minor";

  // To store all user details from database
  allUsers: any;

  // Sitting for  muti-selector
  dropdownSettings = {};

  // To store selected user details
  selectedUsers: Map<string, Array<any>>;
  ngOnInit() {
    this.getUserDetails();

    // Multi-selector sitting initializing
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
  }

  // To store data into database
  addEdit(data: any) {
    // Convert map into an array
    let keys = Array.from(this.selectedUsers.keys());

    // To add user - id with other issue details
    data["Users"] = keys;

    this._issues.addIssue(data).subscribe(
      res => {
        // If the result is a success then show toaster
        // and then redirect to dashboards
        this.toastr.success("Issue Added sucessful", "", {
          positionClass: "toast-top-full-width"
        });
        this._router.navigate(["/dashboard"]);
      },
      err => {
        // If there is any error then show in the toaster
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

  //  if a user is selected one or more userId then add into selecteduser
  onItemSelect(item: any) {
    this.selectedUsers.set(item._id, item.username);
  }

  //  if a user is selected all userId at once then add into selecteduser
  onSelectAll(items: any) {
    items.forEach((item: { _id: string; username: any[] }) => {
      this.selectedUsers.set(item._id, item.username);
    });
  }

  //  if a user is deselected all userId at once then remove from selecteduser
  onDeSelectAll() {
    this.selectedUsers.clear();
  }

  //  if a user is deselected one or more userId then remove from selecteduser
  onDeSelect(item: any) {
    this.selectedUsers.delete(item._id);
  }

  // get all user details from the database and then store into selectedUsers
  getUserDetails() {
    this._users.viewUsers().subscribe(
      res => {
        this.selectedUsers = new Map<string, Array<any>>();
        this.allUsers = res;
      },
      err => {}
    );
  }

  // validate multi-selector is empty or not
  validatMultiselctor() {
    return this.selectedUsers.size == 0 ? true : false;
  }
}
