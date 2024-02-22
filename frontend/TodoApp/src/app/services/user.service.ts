import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl = 'http://localhost:5202/api/';
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Custom-Header-Name': 'Custom-Header-Value',
  });

  login(user: UserLogin): Observable<UserLogin> {
    console.log(
      this.http.post<UserLogin>(this.baseApiUrl + 'User/login', user)
    );
    return this.http.post<UserLogin>(this.baseApiUrl + 'User/login', user);
  }
  register(user: User): Observable<User> {
    user.id = '00000000-0000-0000-0000-000000000000';
    let fd = new FormData();
    fd.append('email', user.email);
    fd.append('username', user.email);
    fd.append('password', user.password);
    fd.append('image', user.image as any);
    console.log(fd);
    return this.http.post<User>(this.baseApiUrl + 'User', fd, {
      headers: this.headers,
    });
  }
}
