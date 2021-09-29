import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/interface/base.interface';
import { Store } from '../store';





export interface CourseSction {
  readonly id: number,
  course_id: number,
  section_name: string,
  status: string,
  number_of_videos: number,
  created_at: string,
  updated_at: string
}



const initalState: CourseSction[] = []


export interface CourseSectionListResponse extends ApiResponse{
  data: {
    courseSections: CourseSction[]
  }
}

export interface AddCourseSectiontResponse extends ApiResponse{
  data: {
    courseSection: CourseSction
  }
}

export interface DeleteCurseSectionResponse extends ApiResponse{
  data: {
    courseSection: CourseSction
  }
}


export interface ChangeCurseSectionStatusResponse extends ApiResponse{
  data: {
    courseSection: CourseSction
  }
}

export interface UpdateCurseSectionResponse extends ApiResponse{
  data: {
    courseSection: CourseSction
  }
}




@Injectable({
  providedIn: 'root'
})
export class CourseSectionService extends Store<CourseSction[]> {

  constructor(private http: HttpClient, private toster: ToastrService) {
    super(initalState)
  }


  getSectionList(course_id: number): Observable<CourseSectionListResponse>{
    return this.http.get<CourseSectionListResponse>(`/course/${course_id}/section`).pipe(
      tap((data:CourseSectionListResponse) => {
        this.nextValue(data.data.courseSections);
      }),
      catchError((error: HttpErrorResponse) => {
        this.toster.error(error.error.message, 'Error')
        throw error
      })
    )
  }

  addCourseSection(data: { course_id: number, section_name: string }) : Observable<AddCourseSectiontResponse>{
    return this.http.post<AddCourseSectiontResponse>('/course/section', data).pipe(
      tap((data: AddCourseSectiontResponse) => {
        const previous_value = this.storeValue;
        this.nextValue([...previous_value, data.data.courseSection]);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.UnprocessableEntity) {
          this.toster.error(error.error.message, 'Error')
        }
        throw error;
      })
    )
  }


  deleteCourseSection(id:number) : Observable<DeleteCurseSectionResponse>{
    return this.http.delete<DeleteCurseSectionResponse>(`/course/section/${id}`).pipe(
      tap((data: DeleteCurseSectionResponse) => {
        const previous_value = this.storeValue.filter((section: CourseSction):any => {
          if (section.id !== id) {
            return section;
          }
        });
        this.nextValue([...previous_value]);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.UnprocessableEntity) {
          this.toster.error(error.error.message, 'Error')
        }
        throw error;
      })
    )
  }

  changeCourseSectionStatus(id:number) : Observable<ChangeCurseSectionStatusResponse>{
    return this.http.patch<ChangeCurseSectionStatusResponse>(`/course/section/${id}`, {}).pipe(
      tap((data: ChangeCurseSectionStatusResponse) => {
        const previous_value = this.storeValue.map((section: CourseSction):any => {
          if (section.id == id) {
            console.log(data.data);
            return data.data.courseSection;
          }
          return section;
        });
        this.nextValue([...previous_value]);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.UnprocessableEntity) {
          this.toster.error(error.error.message, 'Error')
        }
        throw error;
      })
    )
  }


  updateCourseSection(id:number, section_name:string) : Observable<UpdateCurseSectionResponse>{
    return this.http.put<UpdateCurseSectionResponse>(`/course/section/${id}/update`, {section_name}).pipe(
      tap((data: UpdateCurseSectionResponse) => {
        const previous_value = this.storeValue.map((section: CourseSction):any => {
          if (section.id == id) {
            console.log(data.data);
            return data.data.courseSection;
          }
          return section;
        });
        this.nextValue([...previous_value]);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.UnprocessableEntity) {
          this.toster.error(error.error.message, 'Error')
        }
        throw error;
      })
    )
  }


}
