import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceObject } from '../../app/class'
// import * as firebase from 'firebase/app';

/*
  Generated class for the PinhomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PinhomeProvider {
  placeNamearray=[];
  PlaceObject = {} as PlaceObject;

  constructor(private geolocation: Geolocation) {
    console.log('Hello PinhomeProvider Provider');
  }

  getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  initializeItems(){
    this.placeNamearray = this.placeNamearray;
  }

   getItem (searchbar) {
     // Reset items back to all of the items
     // 

   }


}
