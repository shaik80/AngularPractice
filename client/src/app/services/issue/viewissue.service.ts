import {
  Component,
  Injectable,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ViewissueService {
  issueId: any;
  constructor(private http: HttpClient, private _router: Router) {}

  saveData(id: string) {
    this.issueId = id;
    return this.issueId;
  }
  getData() {
    console.log("get data function called");
    return this.issueId;
  }
}
