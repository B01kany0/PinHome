import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import firebase from 'firebase';
import firebase from 'firebase';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PinhomeProvider } from '../providers/pinhome/pinhome';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewPage } from '../pages/view/view';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in'

import { GoogleMaps } from '@ionic-native/google-maps';
import { NearbyOrgPage } from '../pages/nearby-org/nearby-org';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import {CallNumber} from '@ionic-native/call-number'
import {EmailComposer} from '@ionic-native/email-composer'
import {LaunchNavigator} from '@ionic-native/launch-navigator'

import { IonicImageViewerModule } from 'ionic-img-viewer';


firebase.initializeApp({
  apiKey: "AIzaSyCbq2cRI0kgYRsLvx7VvBKYrz-FobKtBME",
  authDomain: "pinhome-823ec.firebaseapp.com",
  databaseURL: "https://pinhome-823ec.firebaseio.com",
  projectId: "pinhome-823ec",
  storageBucket: "pinhome-823ec.appspot.com",
  messagingSenderId: "523364615140"
})

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewPage,
    NearbyOrgPage,
    SignUpPage,
    SignInPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPage,
    NearbyOrgPage,
    SignUpPage,
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PinhomeProvider,
    Geolocation,
    GoogleMaps,
<<<<<<< HEAD
    EmailComposer,
    CallNumber,
    LaunchNavigator
=======
    CallNumber,
    LaunchNavigator,
    EmailComposer
  
>>>>>>> 2d7fb56b6fe732cf8d9a5191f19da06b056794d0
  ]
})
export class AppModule {}
