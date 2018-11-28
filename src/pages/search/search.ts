import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import firebase from 'firebase';




/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  arr: any;
  searchOrgArray: any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public pinhomeProvider: PinhomeProvider) {
    firebase.database().ref('OrganizationList/' ).on('value', (data: any) => {
      var orgName = data.val();
      // if (data.val() != null || data.val() != undefined){
        let oraganisations = data.val();
        let keys = Object.keys(oraganisations);
        for (var x = 0; x < keys.length; x++){
          let OrganisationKeys = keys[x];
          // let organizationObject ={
          //   orgName:oraganisations[OrganisationKeys].OrganizationName,
          //   orgAddress: oraganisations[OrganisationKeys].OrganizationAdress,
          //   orgContact:oraganisations[OrganisationKeys].ContactDetails,
          //   orgPicture:oraganisations[OrganisationKeys].Url
          // }
          this.searchOrgArray.push(Object);
          
        }

       }), Error =>{

        console.log(Error)
    }
     


    // this.items.on('value', profiles => {
    //   let countries = [];
    //   profiles.forEach(  profiles => {
    //     countries.push( profiles.val());
    //     return false;
    //   });

    //   this.items = StreetartzProvider;
    //   this.profiles = StreetartzProvider;
    // });
  // }





  // )}

//     initializeItems() {
//       this.arr = this.profiles;
  }

  initializeItems(){
    this.arr = this.arr;
    console.log(this.arr)
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.arr = this.arr.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.searchOrgArray.length);

  }
}

