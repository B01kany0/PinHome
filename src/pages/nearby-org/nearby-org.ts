import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,GoogleMapsAnimation, Circle
} from '@ionic-native/google-maps';
import { PinhomeProvider } from '../../providers/pinhome/pinhome';
import { ViewPage } from '../view/view';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SignInPage } from '../sign-in/sign-in';

/**
 * Generated class for the NearbyOrgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nearby-org',
  templateUrl: 'nearby-org.html',
})
export class NearbyOrgPage {
  map: GoogleMap;
  orgArray = new Array();
  cat = [];
  location;
  decide = 0;
  arrow = "arrow-down";
  img;
  arrowDir = "arrow-down";
  category;
  logInState
  navColor = "custom";
  images = ["assets/imgs/a.png","assets/imgs/b.png","assets/imgs/c.png","assets/imgs/d.png","assets/imgs/e.png","assets/imgs/f.png","assets/imgs/g.png","assets/imgs/6.png" ]
  circle: Circle;
  profilePic = this.navParams.get('img');

  constructor(private pinhomeProvider: PinhomeProvider,private alertCtrl: AlertController,public pinhome: PinhomeProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  
  }

  ionViewDidLoad() {
    this.loadMap();
    // this.pinhome.getProfile()
    //this.createCurrentLocationMarker();
  }

  loadMap() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Getting your location,please wait',
      duration: 222000

    });
    loading.present();
    // this.orgArray.length = 0;
    this.pinhome.getCurrentLocation().then((radius: any) => {
      this.pinhome.getOrganisations().then((org: any) => {
    // This code is necessary for browser
    this.pinhome.listenForLocation().then((resp:any) =>{
      this.assignLocation(resp);
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
        'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
      });
  
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: resp.coords.latitude,
             lng: resp.coords.longitude
           },
           zoom: 10,
           tilt: 0,
         },
         styles : [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ],
        controls: {
          'compass': true,
          'myLocationButton': false,
          'myLocation': true,   // (blue dot)
          'indoorPicker': true,
          'zoom': false,          // android only
          'mapToolbar': true     // android only
        },
      }
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      this.map.addMarker({
        title: 'current Location',
        icon:  {
          url :"assets/imgs/current.png",
          size : {width: 35, height: 40}
        },
        animation: 'DROP',
        speed: 500,
        time : resp.timestamp,
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      }).then((marker : Marker ) =>{
        marker.showInfoWindow();
      })
      this.pinhome.retrieveOrganization().then((data:any) =>{
        this.orgArray =  data;
        console.log(this.orgArray);
        var indx = 0;
        for (var x = 0; x < this.orgArray.length; x++){
          if (this.orgArray[x].orgCat == "Orphanage")
            indx =  1;
            else if (this.orgArray[x].orgCat == "Disability")
            indx =  2;
            else if (this.orgArray[x].orgCat == "old age")
            indx =  3;
            else if (this.orgArray[x].orgCat == "theraphy")
            indx =  4;
            else if (this.orgArray[x].orgCat == "Psychiatric")
            indx =  5;
            else if (this.orgArray[x].orgCat == "social centre")
            indx =  6;
            else if (this.orgArray[x].orgCat == "Rehab")
            indx =  7;
          this.map.addMarker({
            title: this.orgArray[x].orgName,
            icon:  {
              url :this.images[indx],
              size : {width: 30, height: 30}
            },
            animation: 'DROP',
            disableAutoPan: true,
            position: {
              lat: this.orgArray[x].orgLat,
              lng:  this.orgArray[x].orgLong 
            }
          }).then((marker : Marker ) =>{
            marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(e =>{
                for (var i = 0; i < this.orgArray.length; i++ ){
                  if (this.orgArray[i].orgName ==  marker.getTitle()){
                    this.navCtrl.push(ViewPage,{orgObject: this.orgArray[i]})
                      break;
                  }
                }
            })
          })
        }
        loading.dismiss();
      })
    })
  })
})
  }
  viewDetails(name){
    for (var i = 0; i < this.orgArray.length; i++) {
      if (this.orgArray[i].orgName == name) {
        this.navCtrl.push(ViewPage, { orgObject: this.orgArray[i] })
        break;
      }
    }
  }
  createCurrentLocationMarker() {
    this.pinhome.getCurrentLocation().then((resp: any) => {
      this.map.addMarker({
        title: 'current Location',
        icon: 'red',
        animation: 'POP',
        position: {
          lat: -26.26099,
          lng: 27.9496564
        }
      }).then((marker: Marker) => {
        marker.showInfoWindow();
      })
      this.pinhome.createPositionRadius(resp.coords.latitude, resp.coords.longitude).then(data => {
      })
    })
  }
  GoToHomePage() {
this.navCtrl.popToRoot();
  }
  selectcategory() {
    console.log(this.category);
    this.map.clear();
    this.pinhome.DisplayCategory(this.category).then((data: any) => {
      this.cat = data;

      let position = {
        "lat" :this.location.coords.latitude,
        "lng" : this.location.coords.longitude 
      }
      this.map.addMarker({
        title: 'current Location',
        icon:  {
          url :"assets/imgs/current.png",
          size : {width: 35, height: 40}
        },
        animation: 'DROP',
        speed: 500,
        position: {
          lat: this.location.coords.latitude,
          lng: this.location.coords.longitude
        }
      }).then((marker : Marker ) =>{
        marker.showInfoWindow();
      })
      this.orgArray = data;
      var indx = 0;
      for (var x = 0; x < this.cat.length; x++) {
        if (this.cat[x].orgCat == "Orphanage")
        indx =  1;
        else if (this.orgArray[x].orgCat == "Disability")
        indx =  2;
        else if (this.orgArray[x].orgCat == "old age")
        indx =  3;
        else if (this.orgArray[x].orgCat == "theraphy")
        indx =  4;
        else if (this.orgArray[x].orgCat == "Psychiatric")
        indx =  5;
        else if (this.orgArray[x].orgCat == "social centre")
        indx =  6;
        else if (this.orgArray[x].orgCat == "Rehab")
        indx =  7;
        this.map.addMarker({
          title: this.cat[x].orgName,
          icon:  {
            url :this.images[indx],
            size : {width: 30, height: 30}
          },
          animation: 'DROP',
          position: {
            lat: this.cat[x].orgLat,
            lng: this.cat[x].orgLong
          }
        }).then((marker: Marker) => {
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(e => {
            for (var i = 0; i < this.cat.length; i++) {
              if (this.orgArray[i].orgName == marker.getTitle()) {
                this.navCtrl.push(ViewPage, { orgObject: this.orgArray[i] })
                break;
              }
            }
          })
        })
      }
    })
  }

  assignLocation(resp) {
    this.location = resp;
  }

  scroller(event) {
    // var mapper = document.getElementsByClassName("theMap") as HTMLCollectionOf<HTMLElement>;
    var myArrow = document.getElementsByClassName("theArrow") as HTMLCollectionOf<HTMLElement>;
    // var footBtn = document.getElementsByClassName("listerBtn") as HTMLCollectionOf <HTMLElement>;
    // footBtn[0].style.transition ="700ms";
    var theCont = document.getElementsByClassName("cont") as HTMLCollectionOf <HTMLElement>;
    if (event.scrollTop > 0 && event.directionY == "down") {
      // mapper[0].style.height = "60%";
              // this.arrow = "arrow-down";
        // footBtn[0].style.top= "-45px";

        theCont[0].style.height = "50%"
        theCont[0].style.top = "50%"
        myArrow[0].style.transform = "rotateX(0DEG)"
        console.log("shrinking map 2");
        
      
        // this.arrow = "arrow-down"
      // footBtn[0].style.top = "-38px";
      this.decide = 0;
      // this.arrow = "arrow-down"
      this.navColor = "custom"
    }
    // console.log("scrolling");
    if(this.decide == 0 || event.scrollTop == 0){
      // this.arrow = "arrow-down";
    }
    

  }
  changeMapSize() {
    var theArrow = document.getElementsByClassName("theArrow") as HTMLCollectionOf<HTMLElement>;
    // var divver = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    // var mapSize = document.getElementsByClassName("theMap") as HTMLCollectionOf<HTMLElement>;
    // var footBtn = document.getElementsByClassName("listerBtn") as HTMLCollectionOf <HTMLElement>;

  
    var slideShow = document.getElementsByClassName("slides")  as HTMLCollectionOf <HTMLElement>;
    var theCont = document.getElementsByClassName("cont") as HTMLCollectionOf <HTMLElement>;
    var theContent = document.getElementsByClassName("theDiv") as HTMLCollectionOf <HTMLElement>;
    if (this.decide == 0) {
      this.decide = 1;
      // this.arrow ="arrow-up"
    }
    else {
      this.decide = 0;
      // this.arrow ="arrow-down"
    }
    if (this.decide == 1) {
      theCont[0].style.transition = "300ms"
      theCont[0].style.height = "5%"
      theCont[0].style.top = "95%";
      slideShow[0].style.height = "0"
      

      // mapSize[0].style.height = "95%";
      console.log('growing map');
      theArrow[0].style.transform = "rotateX(180DEG)"
      // this.arrow = "arrow-up";
      // footBtn[0].style.transition = "300ms"
      // footBtn[0].style.top= "0";
      // this.navColor = "navFull"


    }
    else{
      theCont[0].style.transition = "700ms"
      theCont[0].style.top = "85%"
      theCont[0].style.height = "50%"
      theCont[0].style.top = "50%"
      // mapSize[0].style.height = "60%";
      console.log('shrinking map');
      slideShow[0].style.height = "180px"
      // this.arrow = "arrow-down";
      // footBtn[0].style.transition = "1200ms"
      // footBtn[0].style.top= "-45px";
      // this.navColor = "custom"
      theArrow[0].style.transform = "rotateX(0DEG)"
    }
    setTimeout(() => {
      // mapSize[0].style.height = "60%";
      // theArrow[0].style.transform = "rotateX(0DEG)"
      // this.arrow = "arrow-down"
      this.decide = 0;
    }, 60000);

  }
  viewPage() {
    this.pinhomeProvider.checkAuthState().then(data => {
      if (data == false) {
        let alert = this.alertCtrl.create({
          title: 'Ooops!',
          subTitle: 'you have to sign in before you can view your profile, would you like to sign in now?',
          buttons: [
            {
              text: 'Yes',
              handler: data => {
                var opt = "profile";
                this.navCtrl.push(SignInPage, { option: opt })
              }
            },
            {
              text: 'No',
              handler: data => {

              }
            }
          ]
        });
        alert.present();
      } else {
        this.navCtrl.push(ProfilePage)
      }

    })
  }

}