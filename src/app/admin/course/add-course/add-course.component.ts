import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagePickerConfig } from 'src/app/image-picker/image-picker.component';
import { ValidationService } from 'src/app/service/ValidationService';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  spinnerName: string = 'AddCourseComponent'

  addCourseForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required ,ValidationService.decimalValidation]),
    currency_code: new FormControl('', [Validators.required, ValidationService.decimalValidation]),
    discount: new FormControl('', [Validators.required, ValidationService.decimalValidation]),
    language: new FormControl('', [Validators.required, ValidationService.decimalValidation]),
    hours_of_course_access_after_buy: new FormControl('', [Validators.required, ValidationService.numberValidator]),
    about_the_course: new FormControl('', [Validators.required]),
    discription: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required]),
  });

  imapeConfig: ImagePickerConfig|any = {
    lable: 'Course thumbnail',
    formControlName: 'thumbnail',
    formGroup: this.addCourseForm
  }

  constructor() { }

  ngOnInit(): void {
  }

  imageChange(event:any) {
    // this.addCourseForm.get('thumbnail')?.setValue(event)
  }

  ngSubmit() {
    console.log(this.addCourseForm);
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
      if (control.getError('twoDecimalAllowed')) {
        return ValidationService.getValidatorErrorMessage('twoDecimalAllowed')
      }
    }
    return null;
  }

}
