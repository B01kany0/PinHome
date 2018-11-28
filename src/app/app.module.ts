import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PinhomeProvider } from '../providers/pinhome/pinhome';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { ViewPage } from '../pages/view/view';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';






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
    SignInPage,
    SignUpPage,
    ProfilePage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPage,
    SignInPage,
    SignUpPage,
    ProfilePage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PinhomeProvider,
    Geolocation,
    NativeGeocoder
  ]
})
export class AppModule {}
