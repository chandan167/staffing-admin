import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';


export declare interface ImagePickerConfig {
  lable: string;
  preloadImage: string;
  class: string;
  style: object;
  accept: string;
  formControlName: string;
  formGroup: FormGroup | any;
}



@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit, OnChanges {

  @Input('config') config: ImagePickerConfig;
  @Output('onChange') onChangeEvent = new EventEmitter();

  fileLoad: boolean = false;
  defaulImage = "https://i.stack.imgur.com/y9DpT.jpg"

  initalConfig: ImagePickerConfig = {
    lable: 'Add Image',
    preloadImage: this.defaulImage,
    class: "",
    style: {},
    accept: "image/png, image/jpg, image/jpeg",
    formControlName: 'image',
    formGroup: ""
  }


  constructor() {
    this.config = this.initalConfig
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes)
    this.initalConfig = {
      ...this.initalConfig,
      ...this.config
    }
  }


  ngOnInit(): void {

  }


  onImageChange(event: Event | any) {
    const file = event.target?.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.initalConfig.preloadImage = url
      this.fileLoad = true;
      this.config.formGroup.get(this.config.formControlName).setValue(file);
    } else {
      this.fileLoad = false;
      this.initalConfig.preloadImage = ''
    }
    this.onChangeEvent.emit(file);
  }


  remove(input:any) {
    this.initalConfig.preloadImage = this.defaulImage;
    this.fileLoad = false;
    this.config.formGroup.get(this.config.formControlName).setValue('');
    input.value = null;
  }

}
