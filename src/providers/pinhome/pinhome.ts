import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import firebase from 'firebase'
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the PinhomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PinhomeProvider {
  stayLoggedIn;
  ProfileArr: any;
  placeNamearray=[];
  items;
  // PlaceObject = {} as PlaceObject;

  //firebase instances
db = firebase.database();
auth = firebase.auth();

//arrays
oraganisations =  new Array()
searchOrgArray =  new Array();

//variables


  constructor(private geolocation: Geolocation, public nativeGeocoder: NativeGeocoder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello PinhomeProvider Provider');
  }

  getCurrentLocation(){
    //listen for current location
    this.geolocation.getCurrentPosition().then((resp) => {
      return new Promise ((accpt, rej) =>{
        let watch = this.geolocation.watchPosition();
        watch.subscribe((resp) => {
         this.createPositionRadius(resp.coords.latitude,resp.coords.longitude).then(data =>{
           console.log(data)
          accpt(data);
         })
        });
       }).catch((error) => {
         console.log('Error getting location', error);
       });
      })
  }

  // getLocationName(latitude, longitude){
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  // };
  
  // this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
  //   .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
  //   .catch((error: any) => console.log(error));
  // }

  createPositionRadius(latitude, longitude){
    var leftposition, rightposition, downposition, uposititon;
    return new Promise ((accpt, rej) =>{
// down  position
var downlat = new String(latitude); 
var latIndex = downlat.indexOf( "." ); 
var down = parseInt(downlat.substr(latIndex + 1,2)) + 6;
if (down>= 100){
  if (downlat.substr(0,1) == "-"){
    var firstDigits = parseInt(downlat.substr(0,3)) - 1;
  }
  else{
    var firstDigits = parseInt(downlat.substr(0,2)) + 1;
  }
  downposition = firstDigits +  ".00" + downlat.substr(latIndex + 3,downlat.length);
}else{
  if (downlat.substr(0,1) == "-"){
    downposition =  downlat.substr(0,3) + "." + down + downlat.substr(latIndex + 3,downlat.length)
  }
  else{
    downposition = downlat.substr(0,2) + "." + down+ downlat.substr(latIndex + 3,downlat.length)
  }

}
//up  position
var uplat = new String(latitude); 
var latIndex = uplat .indexOf( "." ); 
var down = parseInt(uplat .substr(latIndex + 1,2)) - 6;
if (down <= 0){
  if (uplat.substr(0,1) == "-"){
    var firstDigits = parseInt(uplat.substr(0,3)) + 1;
  }
  else{
    var firstDigits = parseInt(uplat.substr(0,2)) - 1;
  }
  uposititon = firstDigits +  ".00" +uplat.substr(latIndex + 3,uplat.length);
}else{
  if (uplat.substr(0,1) == "-"){
    uposititon = uplat.substr(0,3) + "." + down + uplat.substr(latIndex + 3,uplat.length)
  }
  else{
    uposititon = uplat.substr(0,2) + "." + down+uplat.substr(latIndex + 3,uplat.length)
  }
}
  //left position
 var leftlat = new String(longitude);
 var longIndex =  leftlat.indexOf(".");
 var left =  parseInt(leftlat.substr(longIndex + 1,2)) - 6;
 if (left <= 0){
   if (leftlat.substr(0,1) == "-"){
      var firstDigits =  parseInt(leftlat.substr(0,3)) - 1;
   }else{
    var firstDigits =  parseInt(leftlat.substr(0,2)) + 1;
   }
   leftposition= firstDigits +  ".00" + leftlat.substr(longIndex  + 3,leftlat.length);
 }else{
   if (leftlat.substr(0,1) == "-"){
    leftposition = leftlat.substr(0,3) + "." + left + leftlat.substr(latIndex + 3,uplat.length)
   }
   else{
    leftposition = leftlat.substr(0,2) + "." + left + leftlat.substr(latIndex + 3,uplat.length)
   }

 }
    //right position
    var rightlat = new String(longitude);
    var longIndex =  rightlat.indexOf(".");
    var left =  parseInt(rightlat.substr(longIndex + 1,2)) + 6;
    if (left >= 100){
      if (rightlat.substr(0,1) == "-"){
         var firstDigits =  parseInt(rightlat.substr(0,3)) - 1;
      }else{
       var firstDigits =  parseInt(rightlat.substr(0,2)) + 1;
      }
      rightposition = firstDigits +  ".00" + rightlat.substr(longIndex  + 3,rightlat.length);
    }else{
      rightposition = rightlat.substr(0,2) + "." + left + rightlat.substr(latIndex + 3,rightlat.length)
    }
    let radius ={
      left: leftposition,
      right : rightposition,
      up : uposititon,
      down : downposition
    }
    accpt(radius);
    })
  }

  getOrganisations(){
    return new Promise((accpt, rej) =>{
      this.db.ref('OrganizationList').on('value', (data:any) =>{
        if (data.val() != null || data.val() != undefined){
          let organisations =  data.val();
          let keys = Object.keys(organisations);
          for (var x = 0; x < keys.length; x++){
            let OrganisationKeys = keys[x];
            let organizationObject ={
              orgName:organisations[OrganisationKeys].OrganizationName,
              orgAddress: organisations[OrganisationKeys].OrganizationAdress,
              orgContact:organisations[OrganisationKeys].ContactDetails,
              orgPicture:organisations[OrganisationKeys].Url
            }
            this.oraganisations.push(organizationObject);
          }
          console.log(this.oraganisations)
          accpt(this.oraganisations);
        }
       })
    })
  }


  // initializeItems(){
  //    this.items = this.items;
  // }

   getPlace () {
     // Reset items back to all of the items
     // 

     return new Promise((accpt, rej) =>{
       this.searchOrgArray.length = 0;
       this.db.ref('OrganizationList').on('value', (data:any)=>{
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
            this.searchOrgArray.push(oraganisations[OrganisationKeys].OrganizationName);
          }
          accpt(this.searchOrgArray );
        // }
       })
       
     })

    }


   checkstate() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.stayLoggedIn = 1
        } else {
          this.stayLoggedIn = 0
        }
        resolve(this.stayLoggedIn)
      })
    })
  }
  // logout() {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().signOut().then(() => {
  //       resolve()
  //     }, (error) => {
  //       reject(error)
  //     });
  //   });
  // }
  Signup(email, password, name) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Sign in....',
        duration: 4000000
      });
      loading.present();
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("profiles/" + user.uid).set({
          name: name,
          email: email,
          contact: "",
          downloadurl: '../../assets/download.png'
        })
        resolve();
        loading.dismiss();
      }).catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      })
    })
  }
  SignIn(email, password) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Sign In....',
      duration: 4000000
    });
    loading.present();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve();
        loading.dismiss();
      }).catch((error) => {
        loading.dismiss();
        if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          const alert = this.alertCtrl.create({
            subTitle: "It seems like you have not registered to use StreetArt, please check your login information or sign up to get started",
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  console.log('Cancel');
                }
              }
            ]
          });
          alert.present();
        }
        else {
          const alert = this.alertCtrl.create({


            subTitle: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  console.log('Cancel');
                }
              }
            ]
          });
          alert.present();
        }

      })
    })

  }
  retrieve() {
    let userID = firebase.auth().currentUser;
    return firebase.database().ref("profiles/" + userID.uid)
  }
  profile() {
    this.ProfileArr.length = 0;
    return new Promise((pass, fail) => {
      let userID = firebase.auth().currentUser;
      firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
        let details = data.val();
        this.ProfileArr.push(details);
      })
      pass(this.ProfileArr);
    })
  }
  forgotpassword(email) {
    return new Promise((resolve, reject) => {
      if (email == null || email == undefined) {
        const alert = this.alertCtrl.create({
          subTitle: 'Please enter your Email.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (email != null || email != undefined) {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
          const alert = this.alertCtrl.create({
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK']

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            subTitle: Error.message,
            buttons: ['OK']
          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        subTitle: error.message,
        buttons: [
          {
            text: 'ok',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    })
  }

}

