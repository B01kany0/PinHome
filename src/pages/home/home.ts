import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
orgArray  = new Array();
  constructor(public navCtrl: NavController, public pinhomeProvider: PinhomeProvider) {
  this.getLocation();
  this.getOrganizations();
  }

  getLocation(){
    this.pinhomeProvider.getCurrentLocation();
  }
  getOrganizations(){
    this.pinhomeProvider.getOrganisations().then((data:any) =>{
      this.orgArray = data;
    })
  }

}
