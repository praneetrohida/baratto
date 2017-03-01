import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public http: Http, public alertCtrl: AlertController) {
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
      // let alert = this.alertCtrl.create({
      //   title: this.user.firstName,
      //   }
      // );
      // alert.present();
    });

     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  update() {
    var link = "http://139.59.5.156/test/updateProfile.php";
    var dataa = JSON.stringify({
      token:this.token,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      phone:this.user.phone,
      addLine:this.user.addLine,
      city:this.user.city,
      state:this.user.state,
      pincode:this.user.pincode,
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
      let alert = this.alertCtrl.create({
        title:alertMsg,
        buttons:['OK'],
      });
      alert.present();
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
  city : string,
  pincode : string,
  state : string,
  DOB : string
}

