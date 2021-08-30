import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/interface/base.interface';
import { User } from 'src/app/interface/user.interface';
import { UserList, UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[]
  pagination: Pagination|any;
  constructor(private userService: UserService) {
    this.users = [];
   }

  ngOnInit(): void {
    this.userService.store$.subscribe((data:UserList) => {
      this.users = data.data;
      this.pagination = data.pagination
    })
  }

  searchUser(value:any) {
    this.userService.search(value)
  }

  nextPage() {
    this.userService.next_page()
  }

}
