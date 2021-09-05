import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ShareModule } from 'src/app/share/share.module';
import { TableTrComponent } from './user-list/table-tr/table-tr.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    TableTrComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    DirectiveModule,
    SweetAlert2Module
  ]
})
export class UserModule { }
