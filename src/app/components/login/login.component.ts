import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  error: string = '';

  constructor(private authservice: AuthService, private router: Router) {}
  onsubmit(LoginForm: NgForm) {
    if (this.authservice.Validuser(LoginForm.value)) {
      this.router.navigate(['#'], { replaceUrl: true });
    } else {
      this.error = 'invalid credentials';
    }
  }
}
