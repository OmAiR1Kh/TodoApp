import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
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

  currentItem: any;
  onDragStart(item: any) {
    this.currentItem = item;
  }

  onDrop(e: any, status: number) {
    this.zone.run(() => {
      if (this.currentItem) {
        console.log('triggered');
        e.preventDefault();
        const record: Todo | undefined = this.todos.find(
          (t) => t.id == this.currentItem.id
        );
        console.log(record);
        if (record != undefined) {
          this.todoService
            .updateTodo(record.id, { ...record, status: status })
            .subscribe({
              next: (t) => {
                this.currentItem = null;

                switch (record.status) {
                  case 0:
                    this.toDoItems = this.toDoItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doingItems = this.doingItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doneItems = this.doneItems.filter(
                      (item) => item.id !== record.id
                    );
                    break;
                  case 1:
                    this.toDoItems = this.toDoItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doingItems = this.doingItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doneItems = this.doneItems.filter(
                      (item) => item.id !== record.id
                    );
                    break;
                  case 2:
                    this.toDoItems = this.toDoItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doingItems = this.doingItems.filter(
                      (item) => item.id !== record.id
                    );
                    this.doneItems = this.doneItems.filter(
                      (item) => item.id !== record.id
                    );
                    break;
                }
                switch (status) {
                  case 0:
                    this.toDoItems.push(record);
                    break;
                  case 1:
                    this.doingItems.push(record);
                    break;
                  case 2:
                    this.doneItems.push(record);
                    break;
                }
              },
            });
        }
        this.cdr.detectChanges();
      }
    });
  }

  onDragOver(e: any) {
    console.log(e);
    e.preventDefault();
    console.log(e.target.id);
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
