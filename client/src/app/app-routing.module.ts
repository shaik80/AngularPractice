import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guard/auth.guard";
import { AddIssuesComponent } from "./Issues/add-issues/add-issues.component";
import { AddMessageComponent } from "./Issues/add-message/add-message.component";
import { EditIssueComponent } from "./Issues/edit-issue/edit-issue.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addIssue",
    component: AddIssuesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editIssue",
    component: EditIssueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addMessage/:id",
    component: AddMessageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "addMessage",
    redirectTo: "/dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
