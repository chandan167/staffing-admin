import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagePickerConfig } from 'src/app/image-picker/image-picker.component';
import { buidForm } from 'src/app/helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCourseResponse, CourseService } from 'src/app/service/course/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  spinnerName: string = 'AddCourseComponent'

  sub: SubSink = new SubSink();

  addCourseForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required ,Validators.pattern(/^[0-9]*$/)]),
    currency_code: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    language: new FormControl('', [Validators.required]),
    hours_of_course_access_after_buy: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    about_the_course: new FormControl('', [Validators.required]),
    discription: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required]),
  });

  imapeConfig: ImagePickerConfig|any = {
    lable: 'Course thumbnail',
    formControlName: 'thumbnail',
    formGroup: this.addCourseForm
  }

  constructor(
    private spinner: NgxSpinnerService,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
  }

  resetForm() {
    this.addCourseForm.reset()
  }



  ngSubmit() {
    console.log(this.addCourseForm);
    if (!this.addCourseForm.valid) return
    const formData: FormData = buidForm(this.addCourseForm.value);
    this.spinner.show(this.spinnerName)
    this.sub.sink = this.courseService.create(formData).subscribe((data: AddCourseResponse) => {
      this.addCourseForm.reset()
      this.spinner.hide(this.spinnerName)
    }, (error: HttpErrorResponse) => {
      this.spinner.hide(this.spinnerName)
      this.addCourseForm.setErrors({ serverError: error.error.message });
    })
  }

  get titleError() {
    const control = this.addCourseForm.get('title');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Title is required'
      }
    }
    return null;
  }

  get priceError() {
    const control = this.addCourseForm.get('price');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Price is required'
      }
      if (control.getError('pattern')) {
        return "Only numeric values are allowed"
      }
    }
    return null;
  }

  get currencyCodeError() {
    const control = this.addCourseForm.get('currency_code');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Currency Code is required'
      }
    }
    return null;
  }

  get discountError() {
    const control = this.addCourseForm.get('discount');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Discount is required'
      }
      if (control.getError('pattern')) {
        return "Only numeric values are allowed"
      }
    }
    return null;
  }

  get languageError() {
    const control = this.addCourseForm.get('language');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Language is required'
      }
    }
    return null;
  }


  get hoursOfCourseAccessAfterBuy() {
    const control = this.addCourseForm.get('hours_of_course_access_after_buy');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Hours of course access after buy is required'
      }
      if (control.getError('pattern')) {
        return 'Only numeric values are allowed'
      }
    }
    return null;
  }

  get aboutTheCourseError() {
    const control = this.addCourseForm.get('about_the_course');
    if (control?.touched && !control?.valid) {
      if (control.getError('required')) {
        return 'About the course is required'
      }
    }
    return null;
  }

  get discriptionError() {
    const control = this.addCourseForm.get('discription');
    if (control?.touched) {
      if (control.getError('required')) {
        return 'Discription is required'
      }
    }
    return null;
  }

  get thumbnailError() {
    const control = this.addCourseForm.get('thumbnail');
    if (control?.touched || control?.dirty) {
      if (control.getError('required')) {
        return 'Thumbnail is required'
      }
    }
    return null;
  }

}
