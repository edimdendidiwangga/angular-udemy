import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) signupForm: NgForm;
  title = 'recipe-book-udemy';
  defaultQuestion = "pet";
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;
  
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // })
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: ''
      },
    })
  }

  // onSubmit(form: NgForm) {
  //   console.log('submit', form);
  // }
  onSubmit(form: NgForm) {
    this.submitted = true;
    const { value } = this.signupForm;
    this.user.username = value.userData.username;
    this.user.email = value.userData.email;
    this.user.secretQuestion = value.secret;
    this.user.answer = value.questionAnswer;
    this.user.gender = value.gender;
  }
}
