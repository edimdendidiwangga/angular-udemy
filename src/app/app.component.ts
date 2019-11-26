import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'recipe-book-udemy';
  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActive => {
      this.userActivated = didActive;
    })
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }

}
