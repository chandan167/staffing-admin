import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
    this.authService.getProfile().subscribe();
  }

}
