import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/interface/base.interface';


export interface GenerateUrlResponse extends ApiResponse {
  data: {
    url: string,
    file_path: string,
  }
}

export interface VideoResponse extends ApiResponse {
  data: {
    video: {
      file_name: string,
      path: string,
      size: number,
      type: string,
      section_id: number
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private file_path: string = "";
  private videoPayload: any;
  constructor(private http: HttpClient, private toster: ToastrService) { }


  uploadVideo(section_id: number, file: File): Observable<any> {
    const data = {
      section_id, file_name: file.name
    }
    return this.http.post<GenerateUrlResponse>('/course/section/video/generate-url', data).pipe(
      switchMap((res) => {
        const formData = new FormData();
        formData.append('file', file);
        this.file_path = res.data.file_path;
        return this.http.put<any>(res.data.url, file, {
          headers: { 'skip': 'true'},
          reportProgress: true,
          observe: 'events',
        }).pipe(
          tap(() => {
            this.videoPayload = {
              section_id,
              file_name: file.name.split('.').slice(0, -1).join('.'),
              path: this.file_path,
              size: file.size,
              type: file.type
            }
          })
        );
      })
    )

  }


  uploadVideoDetailOnServer(): Observable<VideoResponse> {
    return this.http.post<VideoResponse>('/course/section/video', this.videoPayload);
  }


}
