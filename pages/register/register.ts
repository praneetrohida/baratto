import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import {TabsPage } from '../tabs/tabs';
import {LoginPage } from '../login/login';
import {WelcomePage } from '../welcome/welcome';

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

  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  addressLine: string;
  city: string;
  pincode: number;
  state: string;
  sex: string;
  DOB: Date;
  username: string;
  password: string;
  cPassword: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public loadingCtrl:LoadingController, public http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doRegister() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    //write code here
    var link = 'http://139.59.5.156/test/register.php';
    var dataa = JSON.stringify({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      addLine: this.addressLine,
      city: this.city,
      pincode: this.pincode,
      state: this.state,
      sex:this.sex,
      DOB: this.DOB, 
      username: this.username,
      password: this.password
    });

    this.http.post(link,dataa).subscribe((data)=>{
      let response = data.text();
      let alertMsg: string;
      switch(response) {
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
      }).catch(() => {});
      // this.navCtrl.remove(1,this.navCtrl.length()-2);
      // this.navCtrl.pop();
    });

    
  }
}
