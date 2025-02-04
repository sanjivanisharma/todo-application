import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkErrorComponent } from './components/others/network-error/network-error.component';
import { NotFoundComponent } from './components/others/not-found/not-found.component';
import { TodoformComponent } from './components/todo/todoform/todoform.component';
import { TodolistComponent } from './components/todo/todolist/todolist.component';
import { TodoitemsComponent } from './components/todo/todoitems/todoitems.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';

import { provideHttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ToastrModule} from 'ngx-toastr'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { NgxPaginationModule } from 'ngx-pagination'

@NgModule({
  declarations: [
    AppComponent,
    NetworkErrorComponent,
    NotFoundComponent,
    TodoformComponent,
    TodolistComponent,
    TodoitemsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: false,
      preventDuplicates: true
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
