import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {catchError, finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  hide = true;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let user: User = new User();
    user.name = this.name.value;
    user.password = this.password.value;
    this.authService.login(user).pipe(
    catchError(error => {
      throw error;
    }),
      finalize(() => {
        }
      )
  ).subscribe(
      result => {
        if (result != undefined) {
          this.authService.setAuthToken(result.token)
          this.router.navigate(['/home']);
        }
      }
    )
  }
}
