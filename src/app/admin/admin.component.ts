import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadclass()
  }


  loadclass() {
    const body = document.querySelector('body');
    body?.classList.add('sidebar-mini');
    body?.classList.remove('login-page')
  }

}
