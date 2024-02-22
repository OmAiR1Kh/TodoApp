import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchValue = '';

  todos: Todo[] = [];

  filterTodos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
    });
  }

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

  getStatusHTML(status: number): SafeHtml {
    let htmlString;
    switch (status) {
      case 0:
        htmlString =
          "<p class='text-sm'>Status <span style='text-align: center; padding: 6px; background: blue; opacity: 1;font-size: 0.6rem; color:white; width: 30%; border-radius: 8px;'>To Do</span></p>";
        break;
      case 1:
        htmlString =
          "<p class='text-sm'>Status <span style='text-align: center; padding: 6px; background: yellow;opacity: 1; font-size: 0.6rem; color:white; width: 30%; border-radius: 8px;'>Doing</span></p>";
        break;
      case 2:
        htmlString =
          "<p class='text-sm'>Status <span style='text-align: center; padding: 6px; background: red; font-size: 0.6rem; opacity: 1; color:white; width: 30%; border-radius: 8px;'>Done</span></p>";
        break;
      default:
        return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  search(data: string) {
    this.filterTodos = this.todos.filter((item) => item.title.includes(data));
    console.log(this.filterTodos);
  }
}
