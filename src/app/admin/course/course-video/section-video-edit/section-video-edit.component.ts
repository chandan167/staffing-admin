import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VideoService } from 'src/app/service/video/video.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-section-video-edit',
  templateUrl: './section-video-edit.component.html',
  styleUrls: ['./section-video-edit.component.scss']
})
export class SectionVideoEditComponent implements OnInit, OnDestroy {

  private section_id: number | any = null;
  private sub: SubSink = new SubSink();
  public videos: any[] = [];
  constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.sub.sink = this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.section_id = Number(param.get('section_id'))
      this.getVideos();
    })
  }


  getVideos() {
    this.videoService.getVideos(this.section_id).subscribe(data => {
      const videos: [any] = data.data.video;
      this.videos = videos;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

