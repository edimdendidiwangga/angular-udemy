import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus = 'No Server was created!';
  serverName = '';
  serverStatus: string = '';
  servers = ['Test Server', 'Test Server 2'];

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  ngOnInit() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(e: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
