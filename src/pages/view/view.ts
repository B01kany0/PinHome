import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
//import { IonicImageViewerModule } from 'ionic-img-viewer';



/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  pet =  "Location"
  orgArray = new Array();
  state = ["star-outline","star-outline","star-outline","star-outline","star-outline"]


  Star1 = "star-outline";
  Star2 = "star-outline";
  Star3 = "star-outline";
  Star4 = "star-outline";
  Star5 = "star-outline";

  blankStar = "star-outline";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public emailComposer: EmailComposer, public callNumber: CallNumber, public launchNavigator: LaunchNavigator) {
    this.orgArray.push(this.navParams.get('orgObject'));

  console.log(this.orgArray[0].orgAddress)
  }

  ionViewDidEnter() {
    this.initMap(this.orgArray[0].orgAddress);
  }



  initMap(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
      let myLatLng = { lat: this.latitude, lng: this.longitude };
      this.objectArray = "test"
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
        mapTypeId: 'terrain'
      });
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    })
  }

  Back(){
    this.navCtrl.pop()
  }
  reposition(event){
    this.initMap(this.orgArray[0].orgAddress);
    let segPosition = document.getElementsByClassName('segment') as HTMLCollectionOf <HTMLElement>;
    segPosition[0].style.transform ="translateY(0%)"
  }

  scroller(event){
    // console.log(event.directionY);
    
    let btnBack = document.getElementsByClassName('backBtn') as HTMLCollectionOf <HTMLElement>;

    if(event.scrollTop > 0 && event.directionY == "down"){
      btnBack[0].style.transition = "700ms"
      btnBack[0].style.transform ="translateY(-200%)"
    }
    else if (event.directionY == "up" || event.scrollTop == 0){
      btnBack[0].style.transform ="translateY(0%)"
    }

    let seg = document.getElementsByClassName('segment') as HTMLCollectionOf <HTMLElement>;
    
    if(event.scrollTop >= 400){
      seg[0].style.width = "100%";
      seg[0].style.position = 'absolute';
      seg[0].style.transform = "translateY("+(event.scrollTop - 420)+"px)";
    }
    else{
      seg[0].style.width = "100%";
      seg[0].style.transform = "translateY(0)"

    }
  }

  directions(address){
    this.launchNavigator.navigate(address)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  call(cell){
    this.callNumber.callNumber(cell, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email(emails){
    let email = {
      to: emails,
      cc: [],
      bcc: [],
      attachment:[],
      subject: '',
      body: '',
      isHtml: false,
      app: 'Gmail'
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  rate(num){  
     if (num == 1){
        if (this.Star1 == "star-outline"){
          this.Star1 = "star";
        }
        else{
          this.Star1 = "star-outline";
          this.Star2 = "star-outline"
          this.Star3 = "star-outline";
          this.Star4 = "star-outline"
          this.Star5 = "star-outline";
        }
     }
     else if (num == 2){
       if (this.Star2 == "star-outline"){
        this.Star1 = "star";
        this.Star2 = "star";
       }
       else{
        this.Star1 = "star";
        this.Star2 = "star-outline"
        this.Star3 = "star-outline";
        this.Star4 = "star-outline"
        this.Star5 = "star-outline";
      }
     }
     else if (num == 3){
      if (this.Star3 == "star-outline"){
       this.Star1 = "star";
       this.Star2 = "star";
       this.Star3 = "star";
      }
      else{
       this.Star1 = "star";
       this.Star2 = "star"
       this.Star3 = "star-outline";
       this.Star4 = "star-outline"
       this.Star5 = "star-outline";
     }
    }
    else if (num == 4){
      if (this.Star4 == "star-outline"){
       this.Star1 = "star";
       this.Star2 = "star";
       this.Star3 = "star";
       this.Star4 = "star";
      }
      else{
       this.Star1 = "star";
       this.Star2 = "star"
       this.Star3 = "star";
       this.Star4 = "star-outline"
       this.Star5 = "star-outline";
     }
    }
    else if (num == 5){
      if (this.Star5 == "star-outline"){
       this.Star1 = "star";
       this.Star2 = "star";
       this.Star3 = "star";
       this.Star4 = "star";
       this.Star5 = "star";
      }
      else{
       this.Star1 = "star";
       this.Star2 = "star"
       this.Star3 = "star";
       this.Star4 = "star"
       this.Star5 = "star-outline";
     }
    }
  }


}