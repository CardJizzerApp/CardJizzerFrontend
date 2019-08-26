import { Injectable } from '@angular/core';
import { GlobalService, NotLoggedInException } from './global.service';
import { runInThisContext } from 'vm';


export class AlreadyIngameException extends Error {
  constructor() {
    super();
    Error.apply(this, arguments);
  }
}

export class NotIngameException extends Error {
  constructor() {
    super();
    Error.apply(this, arguments);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public currentGame = undefined;

  constructor(private global: GlobalService) { }
  fetchNames(): Promise<any[]> {
    return this.global.sendCommand('start').then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData;
    });
  }

  fetchGames(): Promise<any[]> {
    // creategame maxplayers:number deckIds:number[] password:string pointsToWin:number maxRoundTime:number gameTitle:string
    // creategame 4 0 false 20 SomeTitle
    return this.global.sendCommand('fetchgames').then(response => {
      const allGames = [];
      for (let i = 0; i !== response.jsonData.length; i++) {
        allGames.push(response.jsonData[i]);
      }
      return allGames;
    });
  }

  fetchHand(): Promise<any[]> {
    return this.global.sendCommand('fetchcards', true).then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData;
    });
  }

  fetchAllPickedCards(): Promise<any[]> {
    return this.global.sendCommand('fetchallcards', true).then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData;
    });
  }

  playCard(cardUUID): Promise<any> {
    return this.global.sendCommand(`playcard ${cardUUID}`, true).then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response;
    });
  }

  pickCard(cardUUID): Promise<any> {
    return this.global.sendCommand(`pickcard ${cardUUID}`, true).then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response;
    });
  }

  login(username): Promise<any> {
    return this.global.sendCommand(`setusername ${username}`, false).then(response => {
      return response;
    });
  }

  createGame(title: string, maxPlayers: number, maxRoundDuration: number, pointsToWin: number, password: string, deckIds: string[]) {
    const deckIdString = deckIds.toString().replace(' ', '');
    return this.global.sendCommand(
      `creategame ${maxPlayers} ${deckIdString} ${password} ${pointsToWin} ${maxRoundDuration} ${title}`,
      true
      ).then(response => {
        if (this.currentGame !== undefined) {
          throw new AlreadyIngameException();
        }
        return response;
    });
  }

  logout(): Promise<any> {
    return this.global.sendCommand('logout', true).then(response => {
      return response;
    });
  }

  start(): Promise<any> {
    return this.global.sendCommand('start', true).then(response => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response;
    });
  }

  join(gameUUID): Promise<any> {
    return this.global.sendCommand(`join ${gameUUID}`).then(response => {
      if (this.currentGame !== undefined || response.errorCode !== 0) {
        throw new AlreadyIngameException();
      }
      return response;
    });
  }

}
