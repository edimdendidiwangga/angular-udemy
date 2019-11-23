import { Component, OnInit } from '@angular/core';

import { AccountService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'recipe-book-udemy';
  accounts: {name: string, status: string}[] = []

  constructor(private accountsService: AccountService) {

  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
  // onAccountAdded(newAccount: { name: string, status: string }) {
  //   this.accounts.push(newAccount);
  // }

  // onStatusChanged(updateInfo: { id: number, newStatus: string }) {
  //   this.accounts[updateInfo.id].status = updateInfo.newStatus;
  // }


}
