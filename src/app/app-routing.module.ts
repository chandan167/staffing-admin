import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth/auth.guard';
import { GuestGuard } from './guard/guest/guest.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login',  canActivate:[GuestGuard], component: LoginComponent},
  {path:'', canActivate:[AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
