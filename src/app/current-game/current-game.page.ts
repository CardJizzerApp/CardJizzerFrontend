import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GameService } from '../game.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public shouldDisplayGamePanel = false;

  private mycards = ['Hurensohn', 'Fotze', 'Dreiköpfige Schlange.'];
  private allcards = ['1-IJustDev', '2-IJustDev'];
  private currentBlackCard = 'Mein Vater kam in mein Zimmer und sagte: "{w}, du kleiner {w}".';
  constructor(private game: GameService) { }

  ionViewWillEnter() {
    console.log('Loaded');
    if (this.game.currentGame !== undefined) {
      this.shouldDisplayGamePanel = true;
    } else {
      this.shouldDisplayGamePanel = false;
    }
  }

  ngOnInit() {
  }

  currentBlackCardDisplayname() {
    const reg = /\{w}/g;
    return this.currentBlackCard.replace(reg, '__________');
  }

}
