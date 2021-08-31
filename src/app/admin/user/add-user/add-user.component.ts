import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAddResponse, UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  spinnerName:string = 'AddUserComponent'
  addUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    email_verified_at: new FormControl(null),
    phone_verified_at: new FormControl(null),
  })
  constructor(private spinner: NgxSpinnerService, private userService: UserService, private toastr: ToastrService ) {

   }

  ngOnInit(): void {
  }


  addUser() {
    if (!this.addUserForm.valid) {
      return;
    }
    this.spinner.show(this.spinnerName);
    this.userService.create(this.addUserForm.value).subscribe((data: UserAddResponse) => {
      this.spinner.hide(this.spinnerName)
      this.toastr.success('Add User', data.message)
    }, (error: HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName)
      this.addUserForm.setErrors({ serverError: error.error.message });
    })


  }


  // Errors

  emailError() {
    const control = this.addUserForm.get('email');
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
    const control = this.addUserForm.get('name');
    if (control?.touched || control?.dirty) {
      if (control.getError('required')) {
        return 'Email is required';
      }
    }
    return null
  }

}