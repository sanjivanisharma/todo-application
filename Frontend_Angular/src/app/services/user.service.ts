import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { API_ROUTES } from './baseUrls';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient, private router: Router) {
  }

  isLoggedIn(): boolean {
    let localStorage = this.document.defaultView?.localStorage
    if (localStorage) {
      let user = localStorage.getItem('User') || null
      return user !== null
    }
    return false
  }

  login(token: any): Observable<User[]> {
    return this.http.get<User[]>(API_ROUTES.baseUrl + API_ROUTES.login, { headers: { "Authorization": `Basic ${token}` } })
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  signup(body: any, token: any): Observable<User> {
    return this.http.post<User>(API_ROUTES.baseUrl + API_ROUTES.signup, body, { headers: { "Authorization": `Basic ${token}` } })
  }

  getAccessToken() {
    let localStorage = this.document.defaultView?.localStorage
    if (localStorage)
      return localStorage.getItem('User') || null
    return null
  }
}
