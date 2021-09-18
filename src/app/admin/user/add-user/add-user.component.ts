import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAddResponse, UserService } from 'src/app/service/user/user.service';
import { SubSink } from 'subsink';
import { buidForm } from 'src/app/helper';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {

  spinnerName: string = 'AddUserComponent'
  private sub :SubSink
  addUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null),
    image: new FormControl(null),
    email_verified_at: new FormControl(null),
    phone_verified_at: new FormControl(null),
  })

  @ViewChild('image') image: ElementRef | any;
  constructor(private spinner: NgxSpinnerService, private userService: UserService, private toastr: ToastrService ) {
    this.sub = new SubSink()
   }


  ngOnInit(): void {
  }


  addUser() {
    if (!this.addUserForm.valid) {
      return;
    }
    const data = this.addUserForm.value
    const formData = buidForm(data);
    this.spinner.show(this.spinnerName)
    this.sub.sink = this.userService.create(formData).subscribe((data: UserAddResponse) => {
      this.addUserForm.reset()
      this.spinner.hide(this.spinnerName)
    }, (error: HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName)
      this.addUserForm.setErrors({ serverError: error.error.message });
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ImageChange(event: any) {
    const [file] = event.target?.files
    if (file) {
      this.addUserForm.get('image')?.setValue(file)
      this.addUserForm.markAsDirty();
    }
  }

  resetForm() {
    this.addUserForm.reset()
    this.image.nativeElement.src = ""
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
        return 'Name is required';
      }
    }
    return null
  }

}
