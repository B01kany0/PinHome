import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { PlaceObject } from '../../app/class'

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


  // initializeItems(){
  //   this.placeNamearray = this.placeNamearray;
  // }
  initializeItems() {
  
  
  }


  getPlace(searchbar){
    // this.pinhomeProvider.getItems(searchbar)

    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.orgArray = this.orgArray.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.orgArray.length);




  }

  


}

