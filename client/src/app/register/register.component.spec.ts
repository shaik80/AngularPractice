import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";

import { DebugElement } from "@angular/core";
import { By, BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { AuthService } from "../services/auth.service.mock";
import { user } from "../models/user.model";
import { userInfo } from "os";

describe("RegisterComponent", () => {
  let Component: RegisterComponent;
  let _auth: AuthService;
  let httpMock: HttpTestingController;
  let toastMock: ToastrService;
  let username: DebugElement;
  let emailid: DebugElement;
  let password: DebugElement;
  let submit: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [ToastrService, AuthService]
    }).compileComponents();

    _auth = new AuthService();
    httpMock = TestBed.get(HttpTestingController);
    toastMock = TestBed.get(ToastrService);

    const fixture = TestBed.createComponent(RegisterComponent);
    Component = fixture.componentInstance;

    username = fixture.debugElement.query(By.css("input[type=text]"));
    emailid = fixture.debugElement.query(By.css("input[type=email]"));
    password = fixture.debugElement.query(By.css("input[type=password]"));
    submit = fixture.debugElement.query(By.css("button"));
  }));

  it("should register", async(() => {
    let res: any;
    const userdata: user[] = require("../mockapi/user.json");
    username.nativeElement.value = "Shaik mudassir";
    emailid.nativeElement.value = "sh.mudassir81@gmail.com";
    password.nativeElement.value = "hello!";
    let userDetails = {
      username: "Shaik mudassir",
      emailid: "sh.mudassir81@gmail.com",
      password: "hello!"
    };
    submit.triggerEventHandler("click", null);
    _auth.registerUser(userDetails).subscribe(response => {
      res = response;
    });
    expect(res.token).toEqual("tokenData");
  }));
});
