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
      DOB:'',
      profilePicture:'',
    };
    this.getProfile();


    var link="http://139.59.5.156/test/location.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.states = data.states;
    });

  }

  ionViewDidLoad(){
    

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
      this.user.profilePicture = "http://139.59.5.156/test/uploads/" + this.user.profilePicture;
      this.selectedState = data.state;
      this.selectedCity = data.city;
      this.loadCities();
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
      state:this.selectedState,
      city:this.selectedCity
    });

    this.http.post(link,dataa).subscribe((data)=> {
      let response = data.text();
      let alertMsg : string = " ";
      switch(response) {
        case "success":
          alertMsg = "Profile Updated Successfully";
          break;
        default :
          alertMsg = "Some error occurred";
          break;
      }
      alertMsg = response;
       this.toastCtrl.create({
                  message: alertMsg,
                  duration: 3000,
                  position: "bottom"
        }).present();
    });
    
    this.viewCtrl.dismiss();
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
  DOB : string,
  profilePicture: string,
}

