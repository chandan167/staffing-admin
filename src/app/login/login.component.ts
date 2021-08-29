import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";


import { AuthResponse } from '../interface/auth.interface';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spinnerName = "LoginComponent"
  loginForm = new FormGroup({
    email: new FormControl('chandan@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12334', [Validators.required]),
  });


  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadclass();
  }


  login() {
    if (!this.loginForm.valid) {
      return
    }
    this.spinner.show(this.spinnerName);
    this.authService.signin(this.loginForm.value).subscribe((data: AuthResponse) => {

      this.router.navigate(['/dashboard']);
    }, (error: HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName);
      this.loginForm.setErrors({ 'server': error.error.message })
    })

  }



  get emailError() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.touched) {
      if (emailControl.getError('required')) {
        return 'Email is required'
      }
      if (emailControl.getError('email')) {
        return 'Enter valid email'
      }
    }
    return null;
  }

  get passwordError() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.touched) {
      if (passwordControl.getError('required')) {
        return 'Password is required'
      }
    }
    return null;
  }

  get serverError() {
    if (this.loginForm.getError('server')) {
      return this.loginForm.getError('server')
    }
    return null
  }

  loadclass() {
    const body = document.querySelector('body');
    body?.classList.remove('sidebar-mini');
    body?.classList.add('login-page')
  }

}
