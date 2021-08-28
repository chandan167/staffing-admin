import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadclass();
  }



  loadclass() {
    const body = document.querySelector('body');
    body?.classList.remove('sidebar-mini');
    body?.classList.add('login-page')
  }

}
