import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../shared/todo';
import { API_ROUTES } from './baseUrls';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  token = localStorage.getItem('User')
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Basic ${this.token}`
    }),
  }

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient, private router: Router) {
  }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_ROUTES.baseUrl + API_ROUTES.getTodo, { headers: { "Authorization": `Basic ${this.token}` } })
  }

  addTodo(todo: any): Observable<Todo> {
    return this.http.post<Todo>(API_ROUTES.baseUrl + API_ROUTES.createTodo, todo, this.options)
  }

  updateTodo(todo: any): Observable<Todo> {
    return this.http.patch<Todo>(API_ROUTES.baseUrl + API_ROUTES.editTodo, todo, this.options)
  }

  deleteTodo(id: any): Observable<Todo> {
    return this.http.delete<Todo>(API_ROUTES.baseUrl + API_ROUTES.deleteTodo + '/' + id, this.options)
  }

  deleteAllCompletedTodos(): Observable<Todo> {
    return this.http.delete<Todo>(API_ROUTES.baseUrl + API_ROUTES.deleteAll, this.options)
  }

  changeTodoStatus(todo: any): Observable<Todo> {
    return this.http.patch<Todo>(API_ROUTES.baseUrl + API_ROUTES.changeStatus, todo, this.options)
  }
}
