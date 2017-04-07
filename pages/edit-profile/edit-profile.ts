import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

  token: string;
  user: User;
  selectedState; selectedCity; states; cities;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.user = {
      username:"",
      firstName:'',
      lastName:'',
      sex:'',
      email:'',
      phone:'',
      addLine:'', 
      state: '',
      city: '',
      DOB:''
    };
    this.getProfile();


    var link="http://139.59.5.156/test/location.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.states = data.states;
    });
    
    this.selectedState = this.user.state;
    this.selectedCity = this.user.city;

  }

    loadCities() {
    this.states.forEach(state => {
      if(state.name == this.selectedState) {
        this.cities = state.cities;
      }
    });
  }

  getProfile() {
     let loader = this.loadingCtrl.create({
      content: "Fetching data, please wait..."
    });
    loader.present();
    this.storage.get('token').then((val) => {
      this.token = val;
   

    var link = 'http://139.59.5.156/test/viewProfile.php';
    var dataa = JSON.stringify({
      token : this.token
    });

    this.http.post(link,dataa).map(res => res.json()).subscribe((data)=> {
      this.user = data;
      loader.dismiss();
      // let alert = this.alertCtrl.create({
      //   title: this.user.firstName,
      //   }
      // );
      // alert.present();
    });

     });
  }

  update() {
    var link = "http://139.59.5.156/test/updateProfile.php";
    var dataa = JSON.stringify({
      token:this.token,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      phone:this.user.phone,
      addLine:this.user.addLine,
      state:this.user.state,
      city:this.user.city
    });

    this.http.post(link,dataa).subscribe((data)=> {
      let response = data.text();
      let alertMsg : string;
      if(response=="success") {
        alertMsg = "Profile Successfully Updated";
      }
      else {
        alertMsg = "Some error occured";
      }
       this.toastCtrl.create({
                  message: alertMsg,
                  duration: 3000,
                  position: "bottom"
        }).present();
    });
    
    this.viewCtrl.dismiss();
  }

   ionViewDidLoad(){

// get the two fields
//     let addressField = (<HTMLInputElement>document.getElementById("autoComp"));
//     let options = {
// };
// let autocomplete1 = new google.maps.places.Autocomplete(addressField);

// google.maps.event.addListener(autocomplete1,'place_changed', function() {

// let place = autocomplete1.getPlace();
// let geometry = place.geometry;
// if ((geometry) !== undefined) {

// console.log(place.name);

// console.log(geometry.location.lng());

// console.log(geometry.location.lat());

// this.user.addName = place.name;
// this.user.addLat = geometry.location.lat();
// this.user.addLng = geometry.location.lng();

// // let p1 = new google.maps.LatLng(46.0438317, 9.75936230000002);
// // let p2 = new google.maps.LatLng(geometry.location.lat(),geometry.location.lng());
// // let dist = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
// // console.log(dist);
// // let toast = this.toastCtrl.create({
// //   message: dist.toString(),
// //   duration: 3000,
// //   position: 'bottom'
// // });
// // toast.present();

// }
// });
  }

}
interface User {
  username: string,
  firstName : string,
  lastName : string,
  sex : string,
  email : string,
  phone : string,
  addLine : string,
  state : string,
  city : string,
  DOB : string
}

