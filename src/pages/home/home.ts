import { Component } from '@angular/core';
import { NavController, Searchbar, LoadingController } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { PlaceObject } from '../../app/class'
import { database } from 'firebase';
import { ProfilePage } from '../profile/profile';
import { ViewPage } from '../view/view';
import { SignInPage } from '../sign-in/sign-in';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  checkstate(): any {
    throw new Error("Method not implemented.");
  }
  orgArray  = new Array();
  searchQuery: string = '';
  items: string[];
  orgs =  [];
  orgObjects=[];
  
    constructor(public navCtrl: NavController, public pinhomeProvider: PinhomeProvider,public loadingCtrl: LoadingController) {
  this.getNearByOrganizations();
  this.pinhomeProvider.getOrgNames().then((data:any) =>{
   this.storedata( data);
   this.initializeItems();
   this.checkstate();
  })
  
    }
  storedata(data){
    this.orgs =  data;
    console.log(this.orgs);
  }

  storeOrgs(data){
this.orgObjects = data; 
console.log(this.orgObjects)
 }
  
    
    getNearByOrganizations(){
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'please wait',
        duration: 222000
      });
      loading.present();
      this.pinhomeProvider.getCurrentLocation().then((radius:any) =>{
        this.pinhomeProvider.getOrganisations().then((org:any) =>{
          this.pinhomeProvider.getNearByOrganisations(radius,org).then((data:any) =>{
           this.orgArray = data;
           this.storeOrgs(org)
            loading.dismiss();
          })
        })
      })
    }
    more(indx){
      this.navCtrl.push(ViewPage,{orgObject:this.orgArray[indx]})
    }
  
    initializeItems() {
      this.items =  this.orgs;
    }
  
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
  
      // set val to the value of the searchbar
      const val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != "") {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    viewer(name){
      for(let i = 0; i < this.orgObjects.length;i++){
  if (name == this.orgObjects[i].orgName) {
  this.navCtrl.push(ViewPage,{orgObject:this.orgObjects[i]})
  break;
}

      }

      
      
      // this.navCtrl.push(ViewPage,{orgObject:this.item})
    }

    Profile(){
     
        this.navCtrl.push(ProfilePage)
      }
 
  
}

