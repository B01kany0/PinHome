import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the AddOrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-add-organization',
  templateUrl: 'add-organization.html',
})
export class AddOrganizationPage {
  urlCover: any;
  urlArray = new Array();
  coverPhoto: any;
  lat: any;
  lng;
  long;
  latitude;
  longitude
  urlLogo;
  logoPhoto;
  urlGallery;
  galleryupload;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pinhomeProvider: PinhomeProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrganizationPage');
  }


  InsertPicture(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlCover = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.coverPhoto = "Choose another cover photo"

      this.urlArray.push(this.urlCover);
      console.log(this.urlArray);
    }
  }
  InsertLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlLogo = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.logoPhoto = "Choose another logo";
    }

  }
  InsertGallery(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlGallery = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More"
    }
  }


  initMap(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      console.log(this.longitude, this.latitude);
      let myLatLng = { lat: this.latitude, lng: this.longitude };
      // this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng,
        // mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    })
  }

  getcoo(address) {
    return new Promise((accpt, rej) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          let position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
          accpt(position)
        }
      });
    })
  }


  addOrganizations(organization, address, contactDetails, email, AboutOrg, select) {
    this.getcoo(address).then((data: any) => {
      console.log(data.lat);
      this.long = data.lat;
      console.log(this.long);
      firebase.database().ref('OrganizationList/').push({
        OrganizationName: organization,
        OrganizationAdress: address,
        ContactDetails: contactDetails,
        Email: email,
        AboutOrg: AboutOrg,
        Category: select,
        Url: this.urlCover,
        UrlGallery: this.urlGallery,
        longitude: data.lng,
        latitude: data.lat

      })
      this.presentToast();
      this.navCtrl.push(HomePage);
    })

  }


  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'You have added an organization',
      duration: 3000
    });
    toast.present();
  }
}
