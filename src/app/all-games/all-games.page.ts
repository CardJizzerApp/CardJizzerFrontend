import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Game } from '../../helper/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.page.html',
  styleUrls: ['./all-games.page.scss'],
})
export class AllGamesPage implements OnInit {

  games: Game[] = [new Game('TestGame', true, 20)];

  constructor(private alertCtrl: AlertController, private gameService: GameService) { }

  ngOnInit() { }

  ngViewDidLoad() {
    this.fetchGames();
  }

  fetchGames() {
    this.games = [];
    this.gameService.fetchGames().then(response => {
      for (let i = 0; i !== response.length; i++) {
        const gameJSON = response[i];
        this.games.push(new Game(
          gameJSON.title,
          false,
          gameJSON.maxplayers));
      }
    });
  }

  joinGame(game: Game) {
    if (game.PasswordRequired) {
      this.presentAlert();
    }
  }

  ionViewWillLeave() {}

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
