import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { buidForm } from 'src/app/helper';
import { User } from 'src/app/interface/user.interface';
import {UserDetailResponse, UserService, UserUpdateResponse } from 'src/app/service/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {

  user: User | null = null;
  private sub:SubSink
  spinnerName:string = 'EditUserComponent'
  updateUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null),
    email_verified_at: new FormControl(null),
    phone_verified_at: new FormControl(null),
  })
  file: File|any;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sub = new SubSink();
   }


  ngOnInit(): void {
    this.userDetail();
  }


  updateUser() {
    if (!this.updateUserForm.valid) {
      return;
    }
    const data: any = this.updateUserForm.value;
    if (this.file) {
      data.image = this.file;
    }
    const formData = buidForm(data)
    this.spinner.show(this.spinnerName)
    this.userService.update(Number(this.user?.id), formData).subscribe((data: UserUpdateResponse) => {
      this.spinner.hide(this.spinnerName)
      this.updateUserForm.reset(data.data.user);
      this.user = data.data.user
      this.toastr.success(data.message, 'Success');
    }, (error: HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName)
      if (error.status == 422) {
        this.updateUserForm.setErrors({ serverError: error.error.message });
      }
    })
  }


  userDetail() {
    this.spinner.show(this.spinnerName)
     this.sub.sink = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.detail(Number(params.get('id'))!))
     ).subscribe((data: UserDetailResponse) => {
       this.updateUserForm.reset(data.data.user);
       this.user = data.data.user;
       this.spinner.hide(this.spinnerName)
     }, (error:HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName)
    });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ImageChange(event: any) {
    const [file] = event.target?.files
    if (file) {
      this.file = file
      this.updateUserForm.markAsDirty()
    }
  }

  resetForm() {
    this.updateUserForm.reset(this.user)
    this.file = null;
  }

  // Errors

  emailError() {
    const control = this.updateUserForm.get('email');
    if (control?.touched || control?.dirty) {
      if (control.getError('required')) {
        return 'Email is required';
      }
      if (control.getError('email')) {
        return 'Enter valid Email';
      }
    }
    return null
  }

  nameError() {
    const control = this.updateUserForm.get('name');
    if (control?.touched || control?.dirty) {
      if (control.getError('required')) {
        return 'Name is required';
      }
    }
    return null
  }

}
