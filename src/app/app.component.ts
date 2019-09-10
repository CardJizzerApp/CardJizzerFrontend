import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
  ) {
    this.initializeApp();
    this.oauthService.configure(this.authConfig());
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  authConfig() {
    return {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/index.html',
      clientId: '314759812529-m1c3on1lqkr9omtkbe2abc3bd0hnpc9o.apps.googleusercontent.com',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false
    };
  }

}
