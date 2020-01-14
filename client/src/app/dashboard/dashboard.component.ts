import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.dashboard().subscribe(
      res => {
        this._auth.setToken(res.token)
        console.log(res);
      },
      err => console.log(err)
    );

  }

}
