import { Injectable } from '@angular/core';
import { EventErrorCode } from '../helper/eventHelper';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public WEBSOCKETURL = 'https://mypenink.com/cah-backend/';

  public websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket(this.WEBSOCKETURL);
    this.parseMessage();
  }

  sendCommand(command) {
    this.websocket.send(command);
  }

  parseMessage() {
    this.websocket.onmessage = function(e) {
      const message = e.data;
      const response = JSON.parse(message);
      const eventCode = 
    }
  }

}
