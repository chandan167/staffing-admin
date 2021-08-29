import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Admin, AuthResponse, ProfileData, ProfileResponse, TokenData } from 'src/app/interface/auth.interface';
import { Stroe } from '../stroe';




const initalState: Admin = {
    id: 0,
    email: "",
    name: "",
    email_verified_at: "",
    ip: "",
    image: "",
    last_login: "",
    created_at: "",
    super_admin: false,
    updated_at: ""
}




@Injectable({
  providedIn: 'root'
})
export class AuthService extends Stroe<Admin> {

  private token: BehaviorSubject<TokenData | any>;
  private profile: BehaviorSubject<Admin>;

  token$: Observable<TokenData>;
  profile$: Observable<ProfileData>;

  constructor(private http : HttpClient) {
    super(initalState)

    this.token = new BehaviorSubject<TokenData | any>(JSON.parse(localStorage.getItem('token_data') || "{}"));
    this.token$ = this.token.asObservable();

    this.profile = new BehaviorSubject<Admin>(initalState);
    this.profile$ = this.token.asObservable();
  }


  signin(data: { email: string, password: string }):Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/signin', data).pipe(
      tap((data:AuthResponse) => {
        this.nextValue(data.data.admin)
        this.seTokenData = data.data.token_data;
      }),

      catchError((error:HttpErrorResponse) => {
        throw error
      })
    )
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>('/profile').pipe(
      tap((data: ProfileResponse) => {
        this.profile.next(data.data.admin)
      })
    )
  }



  private set seTokenData(tokenData: TokenData|null) {
    localStorage.setItem('token_data', JSON.stringify(tokenData));
    this.token.next(tokenData)
  }

  removerToken() {
    localStorage.removeItem('token_data');
    this.token.next(null);
  }

}
