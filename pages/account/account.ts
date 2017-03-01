import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  token:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    
  }

  logout() {
    this.storage.set('token',null);
    this.navCtrl.push(LoginPage);
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  viewProfile() {
    this.navCtrl.push(ProfilePage);
  }
}
