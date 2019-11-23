import { Component, OnInit } from '@angular/core';
import { LoggingSerice } from '../logging.service';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingSerice, AccountService]
})
export class NewAccountComponent implements OnInit {
  constructor(private loggingService: LoggingSerice, private accountsService: AccountService) { }

  ngOnInit() {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus)
  }
}
