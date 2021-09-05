import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/interface/base.interface';
import { User } from 'src/app/interface/user.interface';
import { UserList, UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  users: User[]
  pagination: Pagination | any;
  spinnerName:string ='UserListComponent'
  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
    this.users = [];
   }

  ngOnInit(): void {
    this.userService.store$.subscribe((data:UserList) => {
      this.users = data.data;
      this.pagination = data.pagination
    })

    this.userService.isloading().subscribe(data => {
      if (data) {
        this.spinner.show(this.spinnerName)
      } else {
        this.spinner.hide(this.spinnerName)
      }
    })
  }

  block(id:number) {
    this.userService.block(id).subscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe();
  }

  searchUser(value:any) {
    this.userService.search(value)
  }

  nextPage() {
    this.userService.next_page()
  }

  userList(index:number, user:User) {
    return user.id;
  }

  onRefresh() {
    this.userService.refresh();
  }

  getSearchValue() {
    return this.userService.getSearchValue();
  }

}
