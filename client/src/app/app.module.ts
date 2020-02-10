import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { QuillModule } from "ngx-quill";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { TokenInterceptorService } from "./services/interceptor/token-interceptor.service";
import { UsersService } from "./services/users/users.service";
import { IssuesService } from "./services/issue/issues.service";
import { AddIssuesComponent } from "./Issues/add-issues/add-issues.component";
import { ViewIssuesComponent } from "./Issues/view-issues/view-issues.component";
import { AddMessageComponent } from "./Issues/add-message/add-message.component";
import { AddEditFormComponent } from "./Issues/add-edit-form/add-edit-form.component";
import { EditIssueComponent } from "./Issues/edit-issue/edit-issue.component";

import { AngularEditorModule } from "@kolkov/angular-editor";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddIssuesComponent,
    ViewIssuesComponent,
    AddMessageComponent,
    AddEditFormComponent,
    EditIssueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    QuillModule.forRoot({}),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: "increasing"
    }),
    NgMultiSelectDropDownModule.forRoot(),
    AngularEditorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    UsersService,
    IssuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
