import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Game } from '../../helper/game';
import { GameService } from '../game.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

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
    private navCtrl: NavController,
    private gameService: GameService,
    private globalService: GlobalService,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get('user_information').then((information) => {
      this.router.navigate(['/login']);
    });
    this.gameService.fetchGames().then(() => {
      this.games = this.gameService.allGames;
    });
  }
  fetchGames() {
    this.gameService.fetchGames().then(() => {
      this.games = this.gameService.allGames;
    });
  }

  login() {
    this.gameService.login(this.username.nativeElement.value).then((response) => {
      if (response.errorCode === 0) {
        return true;
      }
      return false;
    });
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
          handler: (data) => {
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

  createGame() {
    this.navCtrl.navigateForward('create-game');
  }

}
