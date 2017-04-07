import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AccountPage } from '../account/account';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username : string;
  password : string;
  token : string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public http:Http, public storage: Storage, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form) {
    if(form.valid) {
    let loader = this.loadingCtrl.create({
      content: "Signing in, please wait..."
    });
    loader.present();
    var link = 'http://139.59.5.156/test/login.php';
    var dataa = JSON.stringify({
      username: this.username,
      password: this.password
    });

   console.log('clicked');
console.log(form.valid);
    
    this.http.post(link,dataa).subscribe((data) => {
        var alertMessage : string;
        console.log('sent');
        this.token=data.text();
        if(this.token=="Error: 1") {
          alertMessage = "Incorrect username or password.";
        }
        else {
          alertMessage = "Login Successful";
          this.storage.set("token",this.token);
          
          //this.navCtrl.parent.select(0);
          // this.navCtrl.push(AccountPage);
          
        }
         this.toastCtrl.create({
                  message: alertMessage,
                  duration: 3000,
                  position: "bottom"
        }).present();
         loader.dismiss();
         this.navCtrl.popToRoot().then((val) => {
            this.navCtrl.setRoot(TabsPage);
         }).catch(() => {});
        //  this.navCtrl.remove(1,this.navCtrl.length()-2);
        //  this.navCtrl.pop();
        
         
      }, error => {
            console.log("Oooops!");
      });
    }
  }

  register() {
    let registerModal = this.modalCtrl.create(RegisterPage);
    registerModal.present();
  }

}


