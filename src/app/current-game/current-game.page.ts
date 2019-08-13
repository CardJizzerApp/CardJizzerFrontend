import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  mycards = ['Hurensohn', 'Fotze', 'Dreiköpfige Schlange.'];
  allcards = ['1-IJustDev', '2-IJustDev'];
  currentBlackCard = 'Mein Vater kam in mein Zimmer und sagte: "{w}, du kleiner {w}".';

  constructor() { }

  ngOnInit() {
  }

  currentBlackCardDisplayname() {
    const reg = /\{w}/g;
    return this.currentBlackCard.replace(reg, "__________");
  }

}
