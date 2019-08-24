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

  fetchGames() {
    this.allGames = [];
    this.global.sendCommand('fetchgames');
  }

}
