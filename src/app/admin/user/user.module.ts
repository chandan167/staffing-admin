import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DirectiveModule
  ]
})
export class UserModule { }
