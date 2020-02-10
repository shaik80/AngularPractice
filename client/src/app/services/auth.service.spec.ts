import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("AuthService", () => {
  let _auth: AuthService, _httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    _auth = TestBed.get(AuthService);
    _httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    _auth.loggedOut();
  });

  it("Get Token", () => {
    _auth.setToken("Abc");
    expect(_auth.getToken()).toBe("Abc");
  });
  it("Get Token", () => {
    expect(_auth.setToken("Abc")).toBeTruthy();
  });
  it("login", () => {
    _auth.setToken("Abc");
    expect(_auth.loggedIn()).toBeTruthy();
  });

  it("Logout", () => {
    _auth.loggedOut();
    expect(_auth.getToken()).toBeFalsy();
  });
});
