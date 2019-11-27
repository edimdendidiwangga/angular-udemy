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
    console.log('submit', form);
  }
}
