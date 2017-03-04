import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { TextToSpeech } from 'ionic-native';
/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public token:string;
  public isLogin:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl:ViewController) {
    TextToSpeech.speak("Welcome to Baratto!").then(()=>console.log("success")).catch((reason)=>console.log(reason));
    this.checkLogin();
  }

  ionViewDidLoad() {
    this.checkLogin();
  }

  public checkLogin() {
    this.storage.get('token').then((val)=> {
      this.token = val;
      if(this.token== null) {
        this.isLogin = false;
      }
      else {
        // this.navCtrl.push(TabsPage).then(() => {
        //   // first we find the index of the current view controller:
        //   const index = this.viewCtrl.index;
        //   // then we remove it from the navigation stack
        // this.navCtrl.remove(index);
        // });
        this.navCtrl.popToRoot().then((val) => {
            this.navCtrl.setRoot(TabsPage);
         }).catch(() => {});
      }
    });
  }

  public loginClick() {
    this.navCtrl.push(LoginPage);
  }

  public registerClick() {
    this.navCtrl.push(RegisterPage);
  }

}
