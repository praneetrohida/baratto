import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import 'rxjs/add/operator/map';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

token: string;
user: User;
gotProfile : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.gotProfile = false;
    this.user = {
      username:"",
      firstName:'',
      lastName:'',
      sex:'',
      email:'',
      phone:'',
      addLine:'',
      state: "",
      city: '',
      DOB:'',
      profilePicture:''
    };
    this.getProfile();
  }

  ionViewDidLoad() {
    
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
      this.gotProfile = true;
      loader.dismiss();
      // let alert = this.alertCtrl.create({
      //   title: this.user.firstName,
      //   }
      // );
      // alert.present();
    });

     });
  }

  editProfile() {
    let editModal = this.modalCtrl.create(EditProfilePage);
    editModal.onDidDismiss( data => {
      this.getProfile();
    });
    editModal.present();
  }

  // ionViewDidEnter() {
  //   this.getProfile();
  // }



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
  profilePicture: string
}
