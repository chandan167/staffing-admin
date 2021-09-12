import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './comman/sidenav/sidenav.component';
import { NavbarComponent } from './comman/navbar/navbar.component';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserModule } from './user/user.module';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseModule } from './course/course.module';



const router: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: 'users', children: [
          { path: 'list', component: UserListComponent },
          { path: 'add', component: AddUserComponent },
          { path: ':id/edit', component: EditUserComponent },
        ]
      },
      {
        path: 'course', children: [
          { path: 'list', component: CourseListComponent },
        ]
      },
      { path: "", redirectTo: "dashboard", pathMatch: 'full' },
    ]
  }
]





@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent,
    AdminComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    UserModule,
    CourseModule
  ]
})
export class AdminModule { }
