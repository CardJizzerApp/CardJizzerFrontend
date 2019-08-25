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

  public WEBSOCKETURL = 'wss://cah.mypenink.com/';
  public websocket: WebSocket;

  public commandStack: [{ id: number, command: string, response: object }] = new Array();

  private currentCommandId = 0;
  private loggedIn = false;
  constructor() {
    this.websocket = new WebSocket(this.WEBSOCKETURL);
    this.websocket.onclose = ev => {
      this.sendCommand('logout');
    };
    this.parseResponses();
  }

  login(username) {
    this.sendCommand('setusername ' + username).then(response => {
      if (response.errorCode === 0) {
        return true;
      }
      return false;
    });
  }

  sendCommand(command): Promise<{errorCode: number, jsonData: object}> {
    this.currentCommandId += 1;
    return new Promise(resolve => {
      this.commandStack.push({id: this.currentCommandId, command, response: undefined});
      const handle = setTimeout(() => {
        const command = this.findCommandById(this.currentCommandId);
        if (command.response !== undefined) {
          const obj = command.response;
          delete this.commandStack[this.commandStack.indexOf(command)];
          clearTimeout(handle);
          resolve({errorCode: obj.errorCode, jsonData: obj.jsonData});
        }
      }, 100);
      this.websocket.send(this.currentCommandId + ';' + command);
    });
  }

  parseResponses() {
    this.websocket.onmessage = (e) => {
      const message = e.data;
      const commandResponse = message.split(';').length === 2 && JSON.parse(message.split(';')[1]) !== undefined;
      const commandId = commandResponse ? Number.parseInt(message.split(';')[0]) : undefined;
      if (commandResponse) {
        const command = this.findCommandById(commandId);
        command.response = JSON.parse(message.split(';')[1]);
      }
    };
  }

  findCommandById(id) {
    for (let i = 0; i !== this.commandStack.length; i++) {
      const command = this.commandStack[i];
      if (command !== undefined && command.id === id) {
        return command;
      }
    }
    return undefined;
  }

}
