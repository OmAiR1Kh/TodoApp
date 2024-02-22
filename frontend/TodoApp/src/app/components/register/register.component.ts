import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User = {
    id: '',
    email: '',
    image: null,
    password: '',
    username: '',
  };

  userRegister: User = {
    id: '',
    email: '',
    image: null,
    password: '',
    username: '',
  };

  constructor(private userService: UserService) {}

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.userRegister.image = files[0];
    }
  }

  register() {
    this.userService.register(this.userRegister).subscribe({
      next: (user: any) => {
        localStorage.setItem('userId', user.id)
        window.location.pathname = '/todos'
      }
    })
  }

}
