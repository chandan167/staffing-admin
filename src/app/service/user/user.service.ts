import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiResponse, Pagination } from 'src/app/interface/base.interface';
import { User } from 'src/app/interface/user.interface';
import { Store } from '../store';


export interface UserList {
  data: User[],
  pagination: Pagination
}

export interface UserListResponse extends ApiResponse{
  data: {
    users: UserList
  }
}

export interface UserAddResponse extends ApiResponse{
  data: {
    user: User
  }
}

export interface UserDetailResponse extends ApiResponse{
  data: {
    user: User
  }
}

export interface UserUpdateResponse extends ApiResponse{
  data: {
    user: User
  }
}

export interface UserBlockResponse extends ApiResponse{
  data: {
    user: User
  }
}

export interface UserDeleteResponse extends ApiResponse{
  data: {
    user: User
  }
}

const initalState: UserList = {
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
export class UserService extends Store<UserList> {

  private serch$ = new BehaviorSubject<string>('');
  private next_page$ = new BehaviorSubject<number | null>(1);
  private loading = new BehaviorSubject<boolean>(false);
  private refresh$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private toster: ToastrService) {
    super(initalState)

    combineLatest([this.serch$, this.next_page$, this.refresh$]).pipe(
      switchMap(([search, next_page]): any => {
        return this.findAllUsers(next_page, search);
      })
    ).subscribe(() =>
      this.loading.next(false)
    );
  }


  isloading() {
    return this.loading.asObservable();
  }
  private findAllUsers(next_page: number | any, search: string): Observable<UserListResponse> {
    this.loading.next(true);
    return this.http.get<UserListResponse>('/user', { params: { page: next_page, search: search } }).pipe(
      tap((data: UserListResponse) => {
        const previous_value = this.storeValue.data
          this.nextValue({data: [...previous_value, ...data.data.users.data], pagination: data.data.users.pagination})
      })
    );
  }


  create(formData:FormData ): Observable<UserAddResponse> {
    this.loading.next(true);
    return this.http.post<UserAddResponse>('/user', formData).pipe(
      tap((data:UserAddResponse) => {
        const previous_data = this.storeValue.data;
        const pagination = this.storeValue.pagination;
        pagination.total += 1;
        const latest_data = [data.data.user, ...previous_data];
        this.nextValue({ data: latest_data, pagination });
        this.loading.next(false)
        this.toster.success(data.message, 'User Add')
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error(error.error.message, 'Error !')
        throw error;
      })
    )
  }

  block(id: number): Observable<UserBlockResponse> {
    this.loading.next(true);
    return this.http.put<UserBlockResponse>(`/user/${id}/block`, { }).pipe(
      tap((data: UserBlockResponse) => {
        let previous_data = this.storeValue.data;
        previous_data = previous_data.map(user => {
          if (user.id == id) {
            return data.data.user;
          }
          return user;
        });
        const pagination = this.storeValue.pagination;
        this.nextValue({ data: previous_data, pagination });
        this.loading.next(false);
        this.toster.success(data.message, 'User status')
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error(error.error.message, 'Error !')
        throw error;
      })
    )
  }


  delete(id: number): Observable<UserDeleteResponse> {
    this.loading.next(true)
    return this.http.delete<UserDeleteResponse>(`/user/${id}`).pipe(
      tap((data:UserDeleteResponse) => {
        let previous_data = this.storeValue.data;
        previous_data = previous_data.filter(user => user.id !== id);
        const pagination = this.storeValue.pagination;
        pagination.total -= 1;
        this.nextValue({ data: previous_data, pagination });
        this.loading.next(false)
        this.toster.success( data.message,'User delete')
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error( error.error.message, 'Error !',)
        throw error;
      })
    )
  }

  detail(id: number): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(`/user/${id}`);
  }

  update(id: number, data: FormData): Observable<UserUpdateResponse>{

    return this.http.post<UserDetailResponse>(`/user/${id}`, data).pipe(
      tap((data: UserUpdateResponse) => {
        let previous_data = this.storeValue.data;
        previous_data = previous_data.map(user => {
          if (user.id == id) {
            return data.data.user;
          }
          return user;
        });
        const pagination = this.storeValue.pagination;
        const latest_data = previous_data;
        this.nextValue({ data: latest_data, pagination });
      })
    );
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
