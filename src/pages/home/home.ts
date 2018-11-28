import { Component } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { PlaceObject } from '../../app/class'
import { database } from 'firebase';
import { ProfilePage } from '../profile/profile';
import { SearchPage } from '../search/search';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  orgArray = [];
  items = [];
  constructor(public navCtrl: NavController, public pinhomeProvider: PinhomeProvider) {
    this.getLocation();
    // this.getOrganizations();
    this.initializeItems();
   
  }

  getLocation() {
    this.pinhomeProvider.getCurrentLocation();
  }
  getOrganizations() {
    this.pinhomeProvider.getOrganisations().then((data: any) => {
      this.orgArray = data;
    })
  }


  // initializeItems(){
  //   this.placeNamearray = this.placeNamearray;
  // }
  ionViewDidLoad() {
  
  }
  initializeItems() {
    // this.items.length = 0;
    this.pinhomeProvider.getPlace().then((data:any)=>{
      this.items = data ;
      this.items[""];
          })
    //console.log(this.items)
  }


  // getPlace = function (searchbar) {
   

  //   // this.pinhomeProvider.getPlace().then((data: any) => {
  //   //   console.log(data);
      
  //   //   this.items = data;
  //     this.initializeItems();

  //       console.log(this.items)
  //    // console.log(data);

  //     var q = searchbar.srcElement.value;


  //     // if the value is an empty string don't filter the items
  //     if (!q) {
  //       return;
  //     }
  
  //     this.items = this.items.filter((v) => {
  //       if (v.name && q) {
  //         if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //           return true;
  //         }
  //         return false;
  //       }
  //     });
  
  //     console.log(this.items);
  
  

    
     



  //   // set q to the value of the searchbar
   


  // }
  


  test(){
    this.items.length = 0;
  }

 public  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // this.items = [];
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
      var temp =  this.items;
      console.log(temp);
      this.test()
      console.log(this.items)
      // this.items = temp;
      // console.log(temp) 
      
  

    }
  }

}

