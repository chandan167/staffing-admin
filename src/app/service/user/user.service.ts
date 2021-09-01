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
  constructor(private http: HttpClient, private toster: ToastrService) {
    super(initalState)

    combineLatest(this.serch$, this.next_page$).pipe(
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


  create(user: User): Observable<UserAddResponse> {
    this.loading.next(true);
    return this.http.post<UserAddResponse>('/user', user).pipe(
      tap((data:UserAddResponse) => {
        const previous_data = this.storeValue.data;
        const pagination = this.storeValue.pagination;
        pagination.total += 1;
        const latest_data = [data.data.user, ...previous_data];
        this.nextValue({ data: latest_data, pagination });
        this.loading.next(false)
        this.toster.success('User Add', data.message)
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error('Error !', error.error.message)
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
        const latest_data = previous_data;
        this.nextValue({ data: latest_data, pagination });
        this.loading.next(false);
        this.toster.success('User status', data.message)
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error('Error !', error.error.message)
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
        const latest_data = previous_data;
        this.nextValue({ data: latest_data, pagination });
        this.loading.next(false)
        this.toster.success('User delete', data.message)
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.next(false);
        this.toster.error('Error !', error.error.message)
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

  next_page(next_page: number | null = null ) {
    if (!next_page) {
      next_page = this.storeValue.pagination.next_page;
    }
    if (!next_page) {
      return
    }
    this.next_page$.next(next_page);
  }


}
