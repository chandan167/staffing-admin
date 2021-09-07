import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {

  private sub : SubSink
  constructor(private authService: AuthService) {
    this.sub = new SubSink();
   }


  ngOnInit(): void {
    this.loadclass()
    this.getProfile()
  }


  loadclass() {
    const body = document.querySelector('body');
    body?.classList.add('sidebar-mini');
    body?.classList.remove('login-page')
  }

  getProfile() {
    this.sub.sink = this.authService.getProfile().subscribe();
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
