import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { PlaceObject } from '../../app/class'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  placeNamearray=[];
  PlaceObject = {} as PlaceObject;
  items= [];

  constructor(public navCtrl: NavController, public pinhomeProvider: PinhomeProvider) {


    this.initializeItems();

  }

  getLocation(){
    this.pinhomeProvider.getCurrentLocation();
  }


  // initializeItems(){
  //   this.placeNamearray = this.placeNamearray;
  // }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
    
    ];
  }


  getItems(searchbar){
    // this.pinhomeProvider.getItems(searchbar)

    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.items = this.items.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.placeNamearray.length);




  }

  


}

