import { Injectable } from '@angular/core';

export interface Event {
  eventType: EventType;
  errorCode: number;
  data: object;
}

export enum EventType {
  ALL_GAMES = 0,
  CURRENT_GAME = 1,
  MY_DECKS = 2,
  SEND_TO_ALL = 3,
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public WEBSOCKETURL = 'https://mypenink.com/cah-backend/';

  public commandStack: [{ id: number, command: string, response: object }];

  public websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket(this.WEBSOCKETURL);
    this.parseResponses();

    setTimeout(() => {
      this.runCommand();
    }, 100);
  }

  runCommand() {
    for (let i = 0; i !== this.commandStack.length; i++) {
      let response;
      this.websocket.send(this.commandStack[i].command);
      this.websocket.onmessage = (e) => {
        response = e.data;
      };
      console.log(response);
    }
  }

  queueCommand(command): Promise<object> {
    const id = Object.keys(this.commandStack).length;
    this.commandStack.push({ id, command, response: undefined });
    return new Promise(resolve => {
      if (this.commandStack[id].response !== undefined) {
        return this.commandStack[id].response;
      }
    });
  }

  parseResponses() {
    this.websocket.onmessage = (e) => {
      const message = e.data;
      const response = JSON.parse(message);
      const errorCode = response.errorCode;
      const ev: Event = { data: response.data, errorCode: response.errorCode, eventType: EventType.SEND_TO_ALL };
      this.eventStack[id];
    };

  }

}
