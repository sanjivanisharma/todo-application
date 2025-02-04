import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { TodolistComponent } from './components/todo/todolist/todolist.component';
import { NetworkErrorComponent } from './components/others/network-error/network-error.component';
import { NotFoundComponent } from './components/others/not-found/not-found.component';
import { loginGuard } from './auth/login.guard';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },
  { path: 'todo', component: TodolistComponent, canActivate: [authGuard] },
  { path: 'network-error', component: NetworkErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
