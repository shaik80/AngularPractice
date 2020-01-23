import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
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
import { AddIssuesComponent } from "./Issues/add-issues/add-issues.component";
import { ViewIssuesComponent } from "./Issues/view-issues/view-issues.component";
import { AddMessageComponent } from "./Issues/add-message/add-message.component";
import { ViewissueService } from "./services/issue/viewissue.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddIssuesComponent,
    ViewIssuesComponent,
    AddMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: "increasing"
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthService,
    ViewissueService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
