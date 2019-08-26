import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {
  @ViewChild('title', {read: true, static: false}) title: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  createGame() {
    // TODO: this.game.createGame()
  }

}
