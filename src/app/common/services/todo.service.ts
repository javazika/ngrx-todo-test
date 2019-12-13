import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Todo } from '../models/todo';
import { headers } from '../header/headers';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  }

  getAPITodos() {
    return this.http.get(`${this.baseUrl}`, { headers })
      .pipe(catchError((error: any) => throwError(error.message)));
  }

  addAPITodo(todo: Todo) {
    return this.http.post(
      `${this.baseUrl}`,
      JSON.stringify(todo),
      { headers }
    )
      .pipe(catchError((error: any) => throwError(error.message)));
  }

  updateAPITodo(todo: Todo) {
    return this.http.put(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify(todo),
      { headers }
    )
      .pipe(catchError((error: any) => throwError(error.message)));

  }

  deleteAPITodo(todoId: number) {
    return this.http.delete(
      `${this.baseUrl}/${todoId}`,
      { headers }
    )
      .pipe(catchError((error: any) => throwError(error.message)));
  }
}