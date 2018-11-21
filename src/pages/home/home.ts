import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public pinhomeProvider: PinhomeProvider) {

  }

  getLocation(){
    this.pinhomeProvider.getCurrentLocation();
  }

}

