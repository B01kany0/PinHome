import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PlaceObject} from '../../app/class';
import { SignInPage } from '../sign-in/sign-in';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { HomePage } from '../home/home';





/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  name: any;
  email;
  password;
  PlaceObject = {} as object;
  errMsg;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController,public pinhomeProvider: PinhomeProvider,public alertCtrl:AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  SignUp() {
    if (this.name == undefined,
      this.email == undefined || this.email == null,
      this.password == undefined || this.password == null) {
      const alert = this.alertCtrl.create({
        title: "Oops! ",
        subTitle: "Please enter your name,email and password to login.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.email == undefined || this.email == null) {
      const alert = this.alertCtrl.create({
        title: "No Email",
        subTitle: "It looks like you didn't enter your email address.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.password == undefined || this.password == null) {
      const alert = this.alertCtrl.create({
        title: "No Password",
        subTitle: "You have not entered your password. Please enter your password",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.name == undefined) {
      const alert = this.alertCtrl.create({
        title: "No Name",
        subTitle: "It looks like you didn't enter your Name.",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.pinhomeProvider.SignUp(this.email, this.password, this.name).then(() => {
        this.presentLoading1();
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        console.log(error.message);
      })
    }
  }
  dismiss() {
    this.navCtrl.setRoot(SignInPage);
  }
  presentLoading1() {
    const loader = this.loadingCtrl.create({
      content: "loading....",
      duration: 4000
    });
    loader.present();
  }

}
