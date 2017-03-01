import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.gotProfile = false;
    this.user = {
      username:"",
      firstName:'',
      lastName:'',
      sex:'',
      email:'',
      phone:'',
      addLine:'',
      city:'',
      state:'',
      pincode:'',
      DOB:''
    };
    this.getProfile();
  }

  getProfile() {
    this.storage.get('token').then((val) => {
      this.token = val;
   

    var link = 'http://139.59.5.156/test/viewProfile.php';
    var dataa = JSON.stringify({
      token : this.token
    });

    this.http.post(link,dataa).map(res => res.json()).subscribe((data)=> {
      this.user = data;
      this.gotProfile = true;
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
  city : string,
  pincode : string,
  state : string,
  DOB : string
}
