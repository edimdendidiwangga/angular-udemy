import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.isLoading = true;
    } else {
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signup(email, password).subscribe((resData) => {
        this.isLoading = false;
        console.log(resData)
      }, error => {
        this.isLoading = false;
        this.error = error.message;
        console.log('error', error)
      });
    }
  
    form.reset();
  }
}
