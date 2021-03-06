import { Injectable } from '@angular/core';

export class NotLoggedInException extends Error {
  constructor() {
    super();
    Error.apply(this, arguments);
    throw new Error('Not logged in!');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public WEBSOCKETURL = 'wss://cah.mypenink.com/';
  public websocket: WebSocket;

  public commandStack: [{ id: number, command: string, response: any }] = [] as any;
  public eventStack: [{jsonData: any, errorCode: number}] = [] as any;
  public loggedIn = false;

  private currentCommandId = 0;
  constructor() {
    this.websocket = new WebSocket(this.WEBSOCKETURL);
    this.websocket.onclose = (ev) => {
      this.sendCommand('logout');
    };
    this.parseResponses();
  }

  login(username) {
    this.sendCommand('setusername ' + username).then((response) => {
      if (response.errorCode === 0) {
        this.loggedIn = true;
        return true;
      }
      return false;
    });
  }

  sendCommand(command: string, logInRequired?: boolean): Promise<{errorCode: number, jsonData: any}> {
    console.log(command);
    if (logInRequired) {
      if (!this.loggedIn || this.websocket === undefined || this.websocket.readyState !== 1) {
        throw new Error('Not logged in!');
      }
    }
    this.currentCommandId += 1;
    return new Promise((resolve) => {
      this.commandStack.push({id: this.currentCommandId, command, response: undefined});
      const handle = setInterval(() => {
        const cmd = this.findCommandById(this.currentCommandId);
        if (cmd !== undefined && cmd.response !== undefined) {
          const obj = cmd.response;
          delete this.commandStack[this.commandStack.indexOf(cmd)];
          clearTimeout(handle);
          resolve({errorCode: obj.errorCode, jsonData: obj.jsonData});
        }
      }, 50);
      this.websocket.send(this.currentCommandId + ';' + command);
    });
  }

  parseResponses() {
    this.websocket.onmessage = (e) => {
      const message = e.data;
      console.log(message);
      if (message.split(';').length === 1 && JSON.parse(message).errorCode.toString().startsWith('100')) {
        // It's an event.
        const response = JSON.parse(message);
        this.eventStack.push({jsonData: response.jsonData, errorCode: response.errorCode});
      } else {
        // It's an command.
        const commandResponse = message.split(';').length === 2 && JSON.parse(message.split(';')[1]) !== undefined;
        // tslint:disable
        const commandId = commandResponse ? Number.parseInt(message.split(';')[0]) : undefined;
        if (commandResponse) {
          const command = this.findCommandById(commandId);
          command.response = JSON.parse(message.split(';')[1]);
        }
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
