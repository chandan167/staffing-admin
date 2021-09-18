import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiResponse, Pagination } from 'src/app/interface/base.interface';
import { Store } from '../store';

export type status = 'publish' | 'unpublish'

export interface CourseStatus {
  publish: string,
  unpublish: string,
}

export interface Course{
  readonly id: number,
  title: string,
  price: number,
  currency_code: string,
  discount: number,
  hours_of_course_access_after_buy: number,
  language: string,
  about_the_course: string,
  discription: string,
  thumbnail: string,
  last_update: string,
  status: status,
  created_at: string,
  updated_at: string
}

export interface CourseList {
  data: Course[],
  pagination: Pagination
}

export interface CourseListResponse extends ApiResponse{
  data: {
    courses: CourseList
  }
}

export interface CourseStatusChangetResponse extends ApiResponse{
  data: {
    course: Course
  }
}

export interface AddCourseResponse extends ApiResponse{
  data: {
    course: Course
  }
}


export interface CourseDeleteResponse extends ApiResponse{
  data: {
    course: Course
  }
}

const initalState: CourseList = {
  data: [],
  pagination: {
    current_page: 0,
    last_page: 0,
    next_page: null,
    per_page: 0,
    query_param: 'page',
    total:0,
  }
};

@Injectable({
  providedIn: 'root'
})
export class CourseService extends Store<CourseList> {

  private serch$ = new BehaviorSubject<string>('');
  private next_page$ = new BehaviorSubject<number | null>(1);
  private loading = new BehaviorSubject<boolean>(false);
  private refresh$ = new BehaviorSubject<boolean>(false);

  static courseStatus : CourseStatus = {
    publish: 'publish',
    unpublish: 'unpublish',
  }

  constructor(private http: HttpClient, private toster: ToastrService) {
    super(initalState)

    combineLatest([this.serch$, this.next_page$, this.refresh$]).pipe(
      switchMap(([search, next_page]): any => {
        return this.findAllCourses(next_page, search);
      })
    ).subscribe(() =>
      this.loading.next(false)
    );
  }


  isloading() {
    return this.loading.asObservable();
  }


  private findAllCourses(next_page: number | any, search: string): Observable<CourseListResponse> {
    this.loading.next(true);
    return this.http.get<CourseListResponse>('/course', { params: { page: next_page, search: search } }).pipe(
      tap((data: CourseListResponse) => {
        const previous_value = this.storeValue.data
          this.nextValue({data: [...previous_value, ...data.data.courses.data], pagination: data.data.courses.pagination})
      })
    );
  }

  create(formData: FormData): Observable<AddCourseResponse> {
    this.loading.next(true);
    return this.http.post<AddCourseResponse>('/course', formData).pipe(
      tap((data:AddCourseResponse) => {
        const previous_data = this.storeValue.data;
        const pagination = this.storeValue.pagination;
        pagination.total += 1;
        const latest_data = [data.data.course, ...previous_data];
        this.nextValue({ data: latest_data, pagination });
        this.loading.next(false)
        this.toster.success(data.message, 'User Course')
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error(error.error.message, 'Error !')
        throw error;
      })
    )
  }

  changeStatus(id: number): Observable<CourseStatusChangetResponse> {
    this.loading.next(true);
    return this.http.patch<CourseStatusChangetResponse>(`/course/${id}/change-status`, {}).pipe(
      tap((data:CourseStatusChangetResponse) => {
        let previous_data = this.storeValue.data;
        previous_data = previous_data.map(course => {
          if (course.id == id) {
            return data.data.course;
          }
          return course;
        });
        const pagination = this.storeValue.pagination;
        this.nextValue({ data: previous_data, pagination });
        this.loading.next(false);
        this.toster.success(data.message, `Course ${data.data.course.status}`)
      }),

      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error(error.error.message, 'Error !')
        throw error;
      })
    )
  }


  delete(id: number): Observable<CourseDeleteResponse> {
    this.loading.next(true)
    return this.http.delete<CourseDeleteResponse>(`/course/${id}`).pipe(
      tap((data:CourseDeleteResponse) => {
        let previous_data = this.storeValue.data;
        previous_data = previous_data.filter(course => course.id !== id);
        const pagination = this.storeValue.pagination;
        pagination.total -= 1;
        this.nextValue({ data: previous_data, pagination });
        this.loading.next(false)
        this.toster.success( data.message,'Course delete')
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error( error.error.message, 'Error !',)
        throw error;
      })
    )
  }



  private searchTimeout: any = null;
  search(search: string) {
    search = search.trim();
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }
    this.searchTimeout = setTimeout(() => {
      this.next_page$.next(1)
      this.nextValue(initalState);
      this.serch$.next(search)
    }, 500)

  }

  getSearchValue() {
    return this.serch$.getValue();
  }

  next_page(next_page: number | null = null ) {
    if (!next_page) {
      next_page = this.storeValue.pagination.next_page;
    }
    if (!next_page) {
      return
    }
    this.next_page$.next(next_page);
  }

  refresh() {
    this.next_page$.next(1)
      this.nextValue(initalState);
    this.refresh$.next(!this.refresh$.getValue())
  }
}
