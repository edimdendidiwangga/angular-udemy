import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: []
})
export class AccountComponent implements OnInit {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(private accountsService: AccountService) { }

  ngOnInit() {
  }

  onSetTo(status) {
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }

}
