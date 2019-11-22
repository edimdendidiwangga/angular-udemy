import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggingSerice } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingSerice]
})
export class NewAccountComponent implements OnInit {
  @Output() accountAdded = new EventEmitter<{name: string, status:string}>();

  constructor(private loggingService: LoggingSerice) { }

  ngOnInit() {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    })
    this.loggingService.logStatusChange(accountStatus)
  }
}
