import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Game } from '../../helper/Game';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.page.html',
  styleUrls: ['./all-games.page.scss'],
})
export class AllGamesPage implements OnInit {

  games: Game[] = [new Game('TestGame', true, 20)];

  constructor(private alertCtrl: AlertController, private global: GlobalService) { }

  ngOnInit() {
    setTimeout(() => {
      for (let i = 0; i !== this.global.eventStack.length; i++) {
        const event = this.global.eventStack[i];
        const errorCode = event.errorCode;

      }
    }, 1000);
  }

  joinGame(game: Game) {
    if (game.PasswordRequired) {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Password required',
      inputs: [{
        type: 'password',
        name: 'password',
        placeholder: 'Password'
      }],
      message: 'Please enter the lobby password.',
      buttons: [
        {
          text: 'Log in',
          handler: data => {
            console.log(data.password);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

}
