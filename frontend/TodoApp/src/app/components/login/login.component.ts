import { Component } from '@angular/core';
import { User, UserLogin } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = {
    id: '',
    email: '',
    image: null,
    password: '',
    username: '',
  };

  userLogin: UserLogin = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService) {}
  login() {
    this.userService.login(this.userLogin).subscribe({
      next: (user: any) => {
        console.log(user);
        localStorage.setItem('userId', user.user.id);
        alert(`Welcome!! ${user.user.username}`);
        window.location.pathname = '/todos';
      },
    });
  }
  register() {}
}
