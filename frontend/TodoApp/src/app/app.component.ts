import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title = 'TodoApp';
  userId = localStorage.getItem('userId');
  baseApiUrl = 'http://localhost:5202/api/';
  user: User = {
    email: '',
    id: '',
    image: '',
    password: '',
    username: '',
  };
  image: any = '';
  showItems = false;
  show = false;
  navToSearch() {
    window.location.href = '/search';
  }
  ngOnInit(): void {
    if (this.userId) {
      this.http.get(this.baseApiUrl + 'User/' + this.userId).subscribe({
        next: (user: any) => {
          this.user = user;
          this.image = user.image;
        },
      });
    }
  }

  public logout = () => {
    localStorage.clear();
  };
}
