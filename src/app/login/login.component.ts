import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";
import { SubSink } from 'subsink';


import { AuthResponse } from '../interface/auth.interface';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit , OnDestroy{
  private subs :SubSink;
  spinnerName = "LoginComponent"
  loginForm = new FormGroup({
    // chandan@gmail.com
    // 12334
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
    this.subs = new SubSink();
  }


  ngOnInit(): void {
    this.loadclass();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  login() {
    if (!this.loginForm.valid) {
      return
    }
    this.spinner.show(this.spinnerName);
    this.subs.sink = this.authService.signin(this.loginForm.value).subscribe((data: AuthResponse) => {

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
