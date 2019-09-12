import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Game } from '../helper/game';
import Card from '../helper/card';
import { Commands } from '../helper/commands';
const commandRefs = new Commands();

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
        if (event === undefined) {
          continue;
        }
        const data = event.jsonData;
        const errorCode = event.errorCode;
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
            this.global.sendCommand('fetchcards', true).then((response) => {
              this.currentGame.updateHand(response.jsonData);
            });
            break;
          case 100107:
            // Cards have been flipped event
            this.currentGame.overRideAllCards(data);
            break;
          case 100108:
            // // A game has changed event
            // const action = data.action;
            // switch (action) {
            //   case 1:
            //     // Game created
            //     if (this.doesGameAlreadyExist(data.jsonData.id)) {
            //       return false;
            //     }
            //     const jData = data.jsonData;
            //     this.allGames.push(new Game(
            //       jData.title,
            //       jData.passwordRequired,
            //       jData.maxplayers,
            //       jData.id
            //     ));
            //     break;
            //   case 2:
            //     // Player joined
            //     this.fetchGames();
            //     break;
            //   case 3:
            //     // Player left
            //     this.fetchGames();
            //     break;
            //   case 4:
            //     // Game removed
            //     this.fetchGames();
            // }
            this.fetchGames();
            break;
        }
        delete this.global.eventStack[i];
      }
    }, 100);
  }

  fetchNames(): Promise<any[]> {
    return this.global.sendCommand(commandRefs.start()).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData;
    });
  }

  fetchGames(): Promise<any[]> {
    return this.global.sendCommand(commandRefs.fetchGames()).then((response) => {
      console.log(response);
      const allGames = [];
      for (let i = 0; i !== response.jsonData.length; i++) {
        response.jsonData[i].joinable = true;
        console.log(response.jsonData[i]);
        const data = response.jsonData[i];
        const game = new Game(data.title, data.passwordRequired, data.maxplayers, data.id);
        game.setPlayers(data.players);
        allGames.push(game);
      }
      this.allGames = allGames;
      return allGames;
    });
  }

  fetchHand(): Promise<any[]> {
    return this.global.sendCommand(commandRefs.fetchCards(), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData as Card[];
    });
  }

  fetchAllLaidCards(): Promise<Card[]> {
    return this.global.sendCommand(commandRefs.fetchAllLaidCards(), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData as Card[];
    });
  }

  fetchScoreBoard(): Promise<any[]> {
    return this.global.sendCommand(commandRefs.fetchScoreBoard(), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.jsonData;
    });
  }

  playCard(cardUUID): Promise<any> {
    return this.global.sendCommand(commandRefs.playCard(cardUUID), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response;
    });
  }

  pickCard(cardUUID): Promise<any> {
    return this.global.sendCommand(commandRefs.pickCard(cardUUID), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response;
    });
  }

  login(username): Promise<any> {
    return this.global.sendCommand(commandRefs.login(username), false).then((response) => {
      this.global.loggedIn = response.errorCode === 0;
      return response.jsonData;
    });
  }

  createGame(title: string, maxPlayers: number, maxRoundDuration: number, pointsToWin: number, password: string, deckIds: string[]) {
    return this.global.sendCommand(
      commandRefs.createGame(title, maxPlayers, deckIds, maxRoundDuration, pointsToWin, password),
      true
      ).then((response) => {
        if (this.currentGame !== undefined) {
          throw new AlreadyIngameException();
        }
        return response.errorCode;
    });
  }

  logout(): Promise<any> {
    return this.global.sendCommand(commandRefs.logout(), true).then((response) => {
      return response.errorCode;
    });
  }

  start(): Promise<any> {
    return this.global.sendCommand(commandRefs.start(), true).then((response) => {
      if (this.currentGame === undefined || response.errorCode !== 0) {
        throw new NotIngameException();
      }
      return response.errorCode;
    });
  }

  join(gameUUID): Promise<any> {
    return this.global.sendCommand(commandRefs.join(gameUUID), true).then((response) => {
      console.log(response);
      if (this.currentGame !== undefined || response.errorCode !== 0) {
        throw new AlreadyIngameException();
      }
      const data = response.jsonData;
      this.currentGame = new Game(data.title, false, data.maxplayers, gameUUID);
      return response.jsonData;
    });
  }

  getGame(gameUUID: string) {
    for (let i = 0; i !== this.allGames.length; i++) {
      const game = this.allGames[i];
      if (game.Id.toLowerCase() === gameUUID.toLowerCase()) {
        return game;
      }
    }
    return undefined;
  }

  doesGameAlreadyExist(gameUUID: string) {
    if (this.getGame(gameUUID) === undefined) {
      return false;
    }
    return true;
  }

}
