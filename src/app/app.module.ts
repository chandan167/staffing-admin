import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { ShareModule } from './share/share.module';
import { UnauthorizedInterceptor } from './interceptor/unauthorized/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ShareModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
