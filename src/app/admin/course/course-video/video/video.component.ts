import { Component, OnInit } from '@angular/core';
import { IVideoConfig } from 'ngx-video-list-player';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {


  spinnerName: string = "VideoComponent"
  constructor() { }

  ngOnInit(): void { }

  config: IVideoConfig = {
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },

      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        videoName: "Big Buck Bunny",
        artist: "Big Buck Bunny"
      },

    ]
  };



}
