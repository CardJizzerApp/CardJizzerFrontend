import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public allGames = [];

  constructor(private global: GlobalService) { }

  checkPasswordForValidity(): boolean {
    return true;
  }

  async fetchGames(): Promise<object | object[]> {
    // creategame maxplayers:number deckIds:number[] password:string pointsToWin:number maxRoundTime:number gameTitle:string
    // creategame 4 0 false 20 SomeTitle
    // creategame 4 0 false 4 20 someTitle
    return this.global.sendCommand('fetchgames').then(response => {
      console.log(response);
      return response.jsonData;
    });
  }

}
