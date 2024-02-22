import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseApiUrl: string = 'http://localhost:5202/api/';
  userId: string | undefined = localStorage.getItem('userId')?.toString();
  constructor(private http: HttpClient) {}
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `${this.baseApiUrl}Todo/${localStorage.getItem('userId')}`
    );
  }
  addTodo(newTodo: Todo): Observable<Todo> {
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    newTodo.importance = Number(newTodo.importance);
    return this.http.post<Todo>(
      this.baseApiUrl + 'Todo/' + localStorage.getItem('userId'),
      newTodo
    );
  }

  updateTodo(id: any, data: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseApiUrl + 'Todo/' + id, data);
  }

  deleteTodo(id: any): Observable<Todo> {
    return this.http.delete<Todo>(this.baseApiUrl + 'todo/byId?id=' + id);
  }
}
