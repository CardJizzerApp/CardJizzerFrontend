import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Game } from '../helper/game';
import Card from 'src/helper/card';


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
  public currentGame: Game = undefined;
  public allGames: Game[] = [];
  constructor(private global: GlobalService) {
    this.handleEvents();
  }

  // Eventhandler - each 0.1 seconds all event's are being checked.
  handleEvents() {
    setInterval(() => {
      for (let i = 0; i !== this.global.eventStack.length; i++) {
        const event = this.global.eventStack[i];
        const data = event.jsonData;
        const errorCode = event.errorCode;
        console.log(data);
        switch (errorCode) {
          case 100000:
            // Ping-event
            this.global.websocket.send('PONG');
            break;
          case 100101:
            // Card has been played event
            const playeruuid = data.playeruuid;
            const playerCards = this.currentGame.AllCards[playeruuid];
            if (playerCards === undefined) {
              this.currentGame.AllCards[playeruuid] = [];
            }
            playerCards[playerCards.length] =
              new Card(this.currentGame.findPlayerByUUID(playeruuid).Username, undefined);
            break;
          case 100102:
            // Cardjizzer has picked a card event || aka Round over and winner found event
            this.currentGame.setRoundWinner(this.currentGame.findPlayerByUUID(data.winneruuid));
            break;
          case 100103:
            // Player has joined the game event
            if (!this.currentGame.addPlayer(data)) {
              throw new Error('Player is already a part of the game.');
            }
            break;
          case 100104:
            // Game has started event
            this.currentGame.start();
            break;
          case 100105:
            // Game over event
            this.currentGame.stop();
            this.currentGame = undefined;
            break;
          case 100106:
            // New round has started has started event
            this.global.sendCommand('fetchcards', true).then(response => {
              this.currentGame.updateHand(response.jsonData);
            });
            break;
          case 100107:
            // Cards have been flipped event
            this.currentGame.overRideAllCards(data);
            break;
          case 100108:
            // A new game has been created event
            this.allGames.push(new Game(
              data.title,
              data.passwordRequired,
              data.maxplayers,
              data.id
            ));
            this.fetchGames();
            break;
        }
        delete this.global.eventStack[i];
      }
    }, 100);
  }

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
      this.allGames = allGames;
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
      this.global.loggedIn = response.errorCode === 0;
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
    return this.global.sendCommand(`join ${gameUUID}`, true).then(response => {
      console.log(response);
      if (this.currentGame !== undefined || response.errorCode !== 0) {
        throw new AlreadyIngameException();
      }
      return response;
    });
  }

}
