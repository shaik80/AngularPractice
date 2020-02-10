import { TestBed, async, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "../services/auth.service";
describe("AuthGuard", () => {
  let _autGuard: AuthGuard;
  let routerMock: RouterTestingModule;
  let _auth: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard]
    });

    httpMock = TestBed.get(HttpTestingController);
    _autGuard = TestBed.get(AuthGuard);
    routerMock = TestBed.get(RouterTestingModule);
    _auth = TestBed.get(AuthService);
  });
  
  afterEach(() => {
    _auth.loggedOut();
  });
  it("when Authguard it is false", () => {
    expect(_autGuard.canActivate()).toBeFalsy();
  });
  it("when Authguard it is true", () => {
    _auth.setToken("ABC");
    expect(_autGuard.canActivate()).toBeTruthy();
  });
});
