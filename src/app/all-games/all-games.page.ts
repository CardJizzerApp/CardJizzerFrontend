import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.page.html',
  styleUrls: ['./all-games.page.scss'],
})
export class AllGamesPage implements OnInit {

  games: Game[] = [{
    title: 'Hello!',
    passwordRequired: true,
    maxPlayers: 4,
    currentPlayers: ['IJustDev', 'Test']
  }];

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  joinGame(game: Game) {
    if (game.passwordRequired) {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Password required',
      inputs: [{
        type: "password",
        name: "password",
        placeholder: "Password"
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
export interface Game {
  title: string,
  passwordRequired: boolean,
  maxPlayers: number,
  currentPlayers: any[],
}