import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Pagination } from 'src/app/interface/base.interface';
import { User } from 'src/app/interface/user.interface';
import { UserList, UserService } from 'src/app/service/user/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {

  users$: BehaviorSubject<User[]>
  pagination$: BehaviorSubject<Pagination | any>

  private sub: SubSink;

  spinnerName:string ='UserListComponent'
  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
    this.users$ = new BehaviorSubject<User[]>([])
    this.pagination$ = new BehaviorSubject<Pagination | any>({ });
    this.sub = new SubSink();
   }


  ngOnInit(): void {
    this.sub.sink = this.userService.store$.subscribe((data: UserList) => {
      this.users$.next(data.data);
      this.pagination$.next(data.pagination)
    })
    this.sub.sink = this.userService.isloading().subscribe(data => {
      if (data) {
        this.spinner.show(this.spinnerName)
      } else {
        this.spinner.hide(this.spinnerName)
      }
    })
  }

  block(id:number) {
    this.sub.sink = this.userService.block(id).subscribe();
  }

  deleteUser(id: number) {
    this.sub.sink = this.userService.delete(id).subscribe();
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
