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
  answer = ''
  
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
  //   console.log('submit', form);
  // }
  onSubmit(form: NgForm) {
    console.log('submit', form);
  }
}
