import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/models/user-info';
import { WatchService } from 'src/app/services/watch.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  isRegister = false;
  isLoggedIn = false;

  userInfo: UserInfo = {
    username: "",
    password: ""
  }

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  registerForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(
    private watchService: WatchService
  ) { }

  ngOnInit(): void {
    this.watchService.setIsLoggedIn(this.isLoggedIn)
  }

  toRegister() {
    this.isRegister = true;
  }
  toLogin() {
    this.isRegister = false;
  }

  private encryptPassword(password: string): string {
     const secretKey = "mysecretkey123";
     const hash = CryptoJS.SHA256(password + secretKey);
     return hash.toString();
   }

  SubmitLogin() {
    this.userInfo.username = this.loginForm.value.username!;
    this.userInfo.password = this.encryptPassword(this.loginForm.value.password!);

    this.watchService.login(this.userInfo).subscribe(response => {
      this.isLoggedIn = true;
      this.watchService.setIsLoggedIn(this.isLoggedIn);
    },
    (error => {
      console.log(error);
      if(error.error == 'Wrong Password!')
        alert("Wrong Password!");
      if(error.error == "User Not Found!")
        alert("There is no user registered to that username!");
    }))

  }

  SubmitRegister() {
    this.userInfo.username = this.registerForm.value.username!;
    this.userInfo.password = this.encryptPassword(this.registerForm.value.password!);

    this.watchService.register(this.userInfo).subscribe(response => {
      alert("Successfully signed up. Now you can login to our site!");
      this.isRegister = false;
    })
  }

}
