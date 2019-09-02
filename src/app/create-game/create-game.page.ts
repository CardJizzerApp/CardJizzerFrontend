import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Deck from '../../helper/deck';
import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {
  @ViewChild('title', {static: false}) title: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  @ViewChild('maxPlayers', {static: false}) maxPlayers: ElementRef;
  @ViewChild('maxRoundDuration', {static: false}) maxRoundDuration: ElementRef;
  @ViewChild('pointsToWin', {static: false}) pointsToWin: ElementRef;
  @ViewChild('deckQuery', {static: false}) deckQuery: ElementRef;

  private deckResults: Deck[] = [] as any;
  private mockedDeckList: Deck[] = [
    new Deck('TestOne', [], 'TS1'),
    new Deck('TestTwo', [], 'TS2'),
    new Deck('TestThree', [], 'TS3'),
    new Deck('TestFour', [], 'TS4'),
    new Deck('TestFive', [], 'TS5'),
    new Deck('TestSix', [], 'TS6'),
    new Deck('TestSeven', [], 'TS7'),
    new Deck('Hurensohn', [], 'TS420'),
    new Deck('TestOne', [], 'TS1'),
    new Deck('TestTwo', [], 'TS2'),
    new Deck('TestThree', [], 'TS3'),
    new Deck('TestFour', [], 'TS4'),
    new Deck('TestFive', [], 'TS5'),
    new Deck('TestSix', [], 'TS6'),
    new Deck('TestSeven', [], 'TS7'),
  ];
  private selectedDecks: Deck[] = [] as any;
  private searchResults = this.mockedDeckList.length;
  constructor(private game: GameService) {
  }

  ngOnInit() {
    this.deckResults = this.mockedDeckList;
  }

  query() {
    // TODO: Implement cardcast for fetching deckIds from cardcastgame.com
    // const CardCastAPI = require('cardcast-api');
    // this.api = CardCastAPI();
    // this.api.search(this.deckQuery.nativeElement.value);
    this.deckResults = [];
    this.searchResults = 0;
    const query = this.deckQuery.nativeElement.value.toLowerCase();
    for (let i = 0; i !== this.mockedDeckList.length; i++) {
      const deck = this.mockedDeckList[i];
      if (deck.Title.toLowerCase().indexOf(query) !== -1) {
        this.deckResults.push(deck);
        this.searchResults += 1;
      }
    }
  }

  addDeck(deck: Deck) {
    if (this.selectedDecks.indexOf(deck) === -1) {
      this.selectedDecks.push(deck);
    }
  }

  removeDeck(deck: Deck) {
    const index = this.selectedDecks.indexOf(deck);
    if (index === -1) {
      return;
    }
    const newDeck = [];
    for (let i = 0; i !== this.selectedDecks.length; i++) {
      if (this.selectedDecks[i] !== deck) {
        newDeck.push(this.selectedDecks[i]);
      }
    }
    this.selectedDecks = newDeck;
  }

  decksToDeckIds() {
    const deckIds = [];
    for (let i = 0; i !== this.selectedDecks.length; i++) {
      const deck = this.selectedDecks[i];
      deckIds.push(deck.Id);
    }
    return deckIds;
  }

  valueOf(element: ElementRef) {
    return element.nativeElement.value;
  }

  classOfDeck(deck: Deck) {
    if (this.selectedDecks.indexOf(deck) === -1) {
      return 'addable';
    } else {
      return 'not-addable';
    }
  }

  createGame() {
    this.game.createGame(
      this.valueOf(this.title),
      this.valueOf(this.maxPlayers),
      this.valueOf(this.maxRoundDuration),
      this.valueOf(this.pointsToWin),
      this.valueOf(this.password),
      this.decksToDeckIds()
    ).then(response => {
      console.log(response);
    });
  }

}
