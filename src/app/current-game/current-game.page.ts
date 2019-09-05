import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { GameService } from '../game.service';
import Card from '../../helper/card';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public shouldDisplayGamePanel = false;

  private hand: Card[] = [] as any;
  private allCards: Card[] = [] as any;
  private currentBlackCard = 'Mein Vater kam in mein Zimmer und sagte: "{w}, du kleiner {w}".';
  private scoreboard: any = {};
  constructor(
    private gameService: GameService,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    if (this.gameService.currentGame !== undefined) {
      this.shouldDisplayGamePanel = true;
    } else {
      this.shouldDisplayGamePanel = false;
    }
  }

  ngOnInit() { }

  currentBlackCardDisplayname() {
    const reg = /\{w}/g;
    return this.currentBlackCard.replace(reg, '__________');
  }

  fetchAllLaidCards() {
    this.gameService.fetchAllLaidCards().then(response => {
      this.allCards = response;
    });
  }

  fetchHand() {
    this.gameService.fetchHand().then(response => {
      this.hand = response;
    });
  }

  playCard(cardid: string) {
    this.gameService.playCard(cardid).then(response => {
      if (response.errorCode !== 0) {
        return this.createErrorBox();
      }
    });
  }

  pickCard(cardid: string) {
    this.gameService.pickCard(cardid).then(response => {
      if (response.errorCode !== 0) {
        return this.createErrorBox();
      }
    });
  }

  fetchScoreboard() {
    this.gameService.fetchScoreBoard().then(response => {
      this.scoreboard = response;
    });
  }

  public createErrorBox() {
    this.alertCtrl.create({
      header: 'An error occoured',
      animated: true,
      message: 'Card could not be played.'
    }).then(alert => {
      alert.present();
    });
  }
}
