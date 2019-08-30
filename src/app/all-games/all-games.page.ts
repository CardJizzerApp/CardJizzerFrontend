import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('username', {read: ElementRef, static: false}) username: ElementRef;

  public games: Game[] = [] as any;
  constructor(
    private alertCtrl: AlertController,
    private gameService: GameService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.gameService.fetchGames().then(() => {
      this.games = this.gameService.allGames;
    });
  }

  login() {
    this.gameService.login(this.username.nativeElement.value).then(response => {
      console.log(response);
    });
  }

  joinGame(game: Game) {
    console.log(game.Id);
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
