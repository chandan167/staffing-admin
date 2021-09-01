import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'tr[app-table-tr]',
  templateUrl: './table-tr.component.html',
  styleUrls: ['./table-tr.component.scss']
})
export class TableTrComponent implements OnInit {

  @Input('user') user: User | any;
  @Output('block') blockEvent = new EventEmitter();
  @Output('delete') deleteEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
  }

  blockUser() {
    this.blockEvent.emit(this.user.id);
  }

  deleteUser() {
    this.deleteEvent.emit(this.user.id);
  }


}
