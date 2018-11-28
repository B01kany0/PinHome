import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlaceObject} from '../../app/class';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';



/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  // PinhomeProvider: any;
  email;
  password;
  PlaceObject = {} as object;
  errMsg;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:  AlertController,public pinhomeProvider: PinhomeProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  // signup() {
  //   this.navCtrl.setRoot(EulaPage);
  // }
  SignIn() {
    if (this.email == undefined
      || this.password == undefined) {
      const alert = this.alertCtrl.create({
        title: "Oh no! ",
        subTitle: "Please enter your email and password to login.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.email == "") {
      const alert = this.alertCtrl.create({
        title: "No Email",
        subTitle: "It looks like you didn't enter your email address.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.password == "") {
      const alert = this.alertCtrl.create({
        title: "No Password",
        subTitle: "You have not entered your password. Please enter your password",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
 
      this.pinhomeProvider.SignIn(this.email, this.password).then(() => {
        // this.presentLoading1();
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        console.log(error.message);
      })
    }
  }
  presentLoading1() {

  }
  // forgotpassword() {
  //   this.navCtrl.push(ForgotPasswordPage)
  // }



}
