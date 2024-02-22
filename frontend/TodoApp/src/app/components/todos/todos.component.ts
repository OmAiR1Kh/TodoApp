import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  add: boolean = false;
  changeAdd() {
    this.add = !this.add;
  }

  constructor(
    protected todoService: TodoService,
    private sanitizer: DomSanitizer
  ) {}

  getImportanceHTML(importance: number): SafeHtml {
    let htmlString;
    switch (importance) {
      case 0:
        htmlString =
          "<p class='text-sm'>Importance <span style='text-align: center; padding: 6px; background: blue; opacity: 1;font-size: 0.6rem; color:white; width: 30%; border-radius: 8px;'>Low</span></p>";
        break;
      case 1:
        htmlString =
          "<p class='text-sm'>Importance <span style='text-align: center; padding: 6px; background: yellow;opacity: 1; font-size: 0.6rem; color:white; width: 30%; border-radius: 8px;'>Medium</span></p>";
        break;
      case 2:
        htmlString =
          "<p class='text-sm'>Importance <span style='text-align: center; padding: 6px; background: red; font-size: 0.6rem; opacity: 1; color:white; width: 30%; border-radius: 8px;'>High</span></p>";
        break;
      default:
        return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  toDoItems: Todo[] = [];
  doingItems: Todo[] = [];
  doneItems: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.toDoItems = todos.filter((td) => td.status === 0);
        console.log(this.toDoItems); // Logging the filtered todos
        this.doingItems = todos.filter((td) => td.status === 1);
        this.doneItems = todos.filter((td) => td.status === 2);
        console.log(todos);
        this.todos = todos;
      },
    });
  }

  updateTodo(id: any, data: any) {
    console.log(data);
    this.todoService
      .updateTodo(id, { ...data, status: Number(data.status) })
      .subscribe({
        next: (todo) => {
          alert('todo Updated Successfully');
          window.location.reload();
        },
      });
  }

  deleteTodo(id: any) {
    this.todoService.deleteTodo(id).subscribe({
      next: (todo) => {
        alert('Deleted Successfullt');
        this.todoService.getAllTodos().subscribe({
          next: (todos) => {
            this.todos = todos;
          },
        });
      },
    });
  }
}
