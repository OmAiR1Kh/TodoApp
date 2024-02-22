import { Component } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent extends TodosComponent {
  newTodo: Todo = {
    id: '',
    category: '',
    createdDate: new Date(),
    completedDate: new Date(),
    estimatedTime: 0,
    description: '',
    importance: 0,
    status: 0,
    isCompleted: false,
    title: '',
  };

  // constructor(private todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: (todo) => {
        alert('Todo Addedd Successfully');
      },
    });
  }
}
