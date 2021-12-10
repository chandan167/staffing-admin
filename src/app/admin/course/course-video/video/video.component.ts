import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IVideoConfig } from 'ngx-video-list-player';
import { BehaviorSubject } from 'rxjs';
import { VideoService } from 'src/app/service/video/video.service';
import { SubSink } from 'subsink';

interface FileObj {
  progress: number;
  file: File;
  url: null | string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  sub: SubSink = new SubSink();
  startUpload: boolean = false;
  spinnerName: string = "VideoComponent"
  totalProgress = 0;
  tempProgress = 0;

  private videoIndex$ = new BehaviorSubject(0);
  private section_id: number | any = null;
  private loaded: number = 0;
  private total: number = 0;
  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub.sink = this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.section_id = Number(param.get('section_id'))
      this.getVideos();
    })
  }

  config: IVideoConfig = {
    sources: [

    ]
  };


  getVideos() {
    this.videoService.getVideos(this.section_id).subscribe(data => {
      const videos: [any] = data.data.video;
      videos.forEach((video: any) => {
        this.config.sources.push({
          src: video.path,
          videoName: video.file_name,
          type: video.type
        });
      })
    })
  }




  filesObj: FileObj[] = [];

  onSelect(event: any) {
    event.addedFiles.forEach((file: any) => {
      this.filesObj.push({
        file: file,
        progress: 0,
        url: null
      });
    });
  }

  onRemove(event: any) {
    this.filesObj.splice(this.filesObj.indexOf(event), 1);
  }

  upload() {
    if (this.filesObj.length) {
      this.videoUpload()
    }
  }


  private videoUpload() {
    this.startUpload = true;
    this.videoIndex$.subscribe(data => {
      const fileObj = this.filesObj[data];
      this.videoService.uploadVideo(this.section_id, fileObj.file).subscribe(
        (event: HttpEvent<any> | any) => {

          switch (event.type) {
            case HttpEventType.Sent:
              // console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              // console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              const progress = Math.round(event.loaded / event?.total * 100);
              this.loaded = event.loaded
              this.total = event?.total;
              this.filesObj[data].progress = progress;
              this.totalProgress = Math.round(this.tempProgress + progress / this.filesObj.length)

              break;
            case HttpEventType.Response:
              this.tempProgress = this.totalProgress;
              this.videoService.uploadVideoDetailOnServer().subscribe((res) => {
                this.config.sources.push({
                  src: res.data.video.path,
                  videoName: res.data.video.file_name,
                  type: res.data.video.type
                })

                const new_video = this.filesObj[data + 1];
                if (!!new_video) {
                  this.videoIndex$.next(data + 1);

                } else {
                  this.filesObj = [];
                  this.startUpload = false;
                  this.totalProgress = 0;
                }
              })

          }

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    })
  }




}
