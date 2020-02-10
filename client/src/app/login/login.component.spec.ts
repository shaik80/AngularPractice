import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { DebugElement } from "@angular/core";
import { By, BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { user } from "../models/user.model";

describe("LoginComponent", () => {
  let Component: LoginComponent;
  let _auth: AuthService;
  let httpMock: HttpTestingController;
  let toastMock: ToastrService;
  let emailid: DebugElement;
  let password: DebugElement;
  let submit: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [ToastrService, AuthService]
    }).compileComponents();

    _auth = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    toastMock = TestBed.get(ToastrService);

    const fixture = TestBed.createComponent(LoginComponent);
    Component = fixture.componentInstance;

    emailid = fixture.debugElement.query(By.css("input[type=email]"));
    password = fixture.debugElement.query(By.css("input[type=password]"));
    submit = fixture.debugElement.query(By.css("button"));
  }));

  it("should login", async(() => {
    const userdata: user[] = require("../mockapi/user.json");
    emailid.nativeElement.value = "sh.mudassir98@gmail.com";
    password.nativeElement.value = "hello!";
    submit.triggerEventHandler("click", null);
    _auth.loginUser(userdata[0]).subscribe(response => {
      expect(response).toBeTruthy();
    });
    expect(userdata[0].emailid).toBe("sh.mudassir98@gmail.com");
    expect(userdata[0].password).toBe("hello!");
  }));
});
