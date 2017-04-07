import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { ImagePicker, Camera, Transfer } from 'ionic-native';
// import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
// import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarker, GoogleMapsMarkerOptions } from 'ionic-native';


/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  autocomplete1: any;
  place: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  addressName: string;
  addLine: any;
  state: any;
  city: any;
  sex: string;
  DOB: Date;
  username: string;
  password: string;
  cPassword: string;
  pictureSelected: boolean = false;
  filename: string = "";
  pictureURI;
  selectedCity: any;
  selectedState: any;
  states: any;
  cities: any;

  // map: GoogleMap;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    var link="http://139.59.5.156/test/location.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.states = data.states;
    });
  }



  loadCities() {
    this.states.forEach(state => {
      if(state.name == this.selectedState) {
        this.cities = state.cities;
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doRegister() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();


    //     let geometry = this.place.geometry;
    // // this.mapWork(place.name,geometry.location.lat(),geometry.location.lng());
    // this.addLine = this.place.name;
    // this.state = geometry.location.lat();
    // this.city = geometry.location.lng();


    //write code here
    var link = 'http://139.59.5.156/test/register.php';
    if (this.filename == "") {
      var dataa = JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        addLine: this.addLine,
        state: this.selectedState,
        city: this.selectedCity,
        sex: this.sex,
        DOB: this.DOB,
        username: this.username,
        password: this.password
      });
    } else {
      var dataa = JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        addLine: this.addLine,
        state: this.selectedState,
        city: this.selectedCity,
        sex: this.sex,
        DOB: this.DOB,
        username: this.username,
        password: this.password,
        profilePicture: this.filename
      });
    }
    console.log(this.addLine + this.state + this.city);
    console.log(JSON.stringify(dataa));

    this.http.post(link, dataa).subscribe((data) => {
      let response = data.text();
      let alertMsg: string;
      switch (response) {
        case "success":
          alertMsg = "Registration Successful";
          break;
        case "Error : 2":
          alertMsg = "Username already exists";
          break;
        case "Error : 3":
          alertMsg = "Email already registered";
          break;
      }
      this.toastCtrl.create({
        message: alertMsg,
        duration: 3000,
        position: "bottom"
      }).present();
      loader.dismiss();
      this.navCtrl.popToRoot().then((val) => {
        this.navCtrl.setRoot(WelcomePage);
      }).catch(() => { });
      // this.navCtrl.remove(1,this.navCtrl.length()-2);
      // this.navCtrl.pop();
    });


  }

  uploadPic() {
    ImagePicker.getPictures({
      maximumImagesCount: 1
    }).then((results) => {
      this.pictureURI = results[0];
      this.pictureSelected = true;
      var url = "http://139.59.5.156/test/uploadImage.php";

      // File for Upload
      var targetPath = this.pictureURI;

      // File name only
      this.filename = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12) + ".jpeg";
      this.toastCtrl.create({
        message: this.filename,
        duration: 3000,
        position: "bottom"
      }).present();

      var options = {
        fileKey: "file",
        fileName: this.filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': this.filename }
      };

      const fileTransfer = new Transfer();



      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {

      }, err => {

      });
    });
    // Camera.getPicture({
    //   allowEdit: true,
    //   sourceType: 0
    // }).then((result)=>{
    //   this.pictureURI = result;
    //   this.pictureSelected = true;
    // });

  }



  ionViewDidLoad() {
    // this.loadMap();
  }

  // loadMap() {

  //   this.map.getMyLocation().then((val) => {
  //     let location: GoogleMapsLatLng = val.latLng;
  //     this.map = new GoogleMap('map', {
  //       'backgroundColor': 'white',
  //       'controls': {
  //         'compass': true,
  //         'myLocationButton': true,
  //         'indoorPicker': true,
  //         'zoom': true
  //       },
  //       'gestures': {
  //         'scroll': true,
  //         'tilt': true,
  //         'rotate': true,
  //         'zoom': true
  //       },
  //       'camera': {
  //         'latLng': location,
  //         'tilt': 30,
  //         'zoom': 15,
  //         'bearing': 50
  //       }
  //     });
  //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  //       console.log('Map is ready!');
  //     });

  //     let markerOptions: GoogleMapsMarkerOptions = {
  //       position: location,
  //       title: "My Location"
  //     };

  //     this.map.addMarker(markerOptions)
  //       .then((marker: GoogleMapsMarker) => {
  //         marker.showInfoWindow();
  //       });
  //   });
  // }
}



