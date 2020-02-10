import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  registerUser(user: {}) {
    return of({
      token: "tokenData"
    });
  }
}
