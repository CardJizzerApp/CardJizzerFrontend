import { Component, OnInit } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isDesktop = this.platform.is('desktop');

  constructor(private googlePlus: GooglePlus, public platform: Platform) { }

  ngOnInit() {
  }

  loginWithGoogleNative() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  loginWithGoogleDesktop() {
    
  }

}
