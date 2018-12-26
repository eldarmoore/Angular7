import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-server]',
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  getServerStatus() {
    return this.serverStatus;
  }
}
