import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AuthService } from "../auth.service";
import { TokenInterceptorService } from "./token-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { user } from "../../models/user.model";

describe(`AuthHttpInterceptor`, () => {
  let _auth: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    });

    _auth = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it("should add an Authorization header", () => {
    const userdata: user[] = require("../../mockapi/user.json");
    _auth.loginUser(userdata[0]).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${_auth._loginUrl}`);

    expect(httpRequest.request.headers.has("Authorization")).toBe(true);
  });
});
