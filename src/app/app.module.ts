import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://29d2c28b1f5449fd945352259353504c@sentry.io/1552657'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    console.log(error);
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ lang: 'en', eventId });
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    HttpClientModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
