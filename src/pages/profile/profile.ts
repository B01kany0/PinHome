import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { PlaceObject} from '../../app/class';




/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  uid1: any;
  detailArray = [];
  uid;

  constructor(public navCtrl: NavController, public navParams: NavParams,public PinhomeProvider:PinhomeProvider) {
    
    // this.PinhomeProvider.getProfile().then((data:any) =>{

    // })

      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let userID = firebase.auth().currentUser;
    firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
      this. detailArray.length = 0
      let details = data.val();
      console.log(details)
      this. detailArray.push(details);
    })
  }
  

}

  