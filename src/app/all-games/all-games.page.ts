import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Game } from '../../helper/game';
import { GameService } from '../game.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.page.html',
  styleUrls: ['./all-games.page.scss'],
})
export class AllGamesPage implements OnInit {

  games: Game[] = [new Game('TestGame', true, 20, '20')];

  constructor(
    private alertCtrl: AlertController,
    private gameService: GameService,
    private globalService: GlobalService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log('MMH');
  }
  login() {
    this.gameService.login('Fotzes').then(response => {
      console.log(response);
    });
  }

  fetchGames() {
    this.games = [];
    this.gameService.fetchGames().then(response => {
      console.log(response);
      for (let i = 0; i !== response.length; i++) {
        const gameJSON = response[i];
        this.games.push(new Game(
          gameJSON.title,
          false,
          gameJSON.maxplayers,
          gameJSON.uuid
        ));
      }
    });
  }

  ngOnDestroy() {
    this.globalService.sendCommand('logout');
    this.globalService.websocket.close();
  }

  joinGame(game: Game) {
    if (game.PasswordRequired) {
      this.presentAlert();
    }
    this.gameService.join(game.Id);
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
