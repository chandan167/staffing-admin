import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './comman/sidenav/sidenav.component';
import { NavbarComponent } from './comman/navbar/navbar.component';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';



const router: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "", redirectTo:"dashboard", pathMatch: 'full' },
  ] }
]





@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent,
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ]
})
export class AdminModule { }
