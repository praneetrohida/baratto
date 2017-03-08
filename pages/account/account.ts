import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { WelcomePage } from '../welcome/welcome';
import { AddListingPage } from '../add-listing/add-listing';
import { ViewListingsPage } from '../view-listings/view-listings';


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
  token:string; user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public platform: Platform, public http: Http) {
    this.user={
          firstName:"",
          lastName:""
    }
    this.storage.get('token').then((val) => {
      this.token = val;
   

    var link = 'http://139.59.5.156/test/viewProfile.php';
    var dataa = JSON.stringify({
      token : this.token
    });

    this.http.post(link,dataa).map(res => res.json()).subscribe((data)=> {
      this.user = data;
   
    });

     });
  }

  logout() {
    this.storage.set('token',null);
    this.platform.exitApp();
    // this.navCtrl.remove(1,this.navCtrl.length()-2);
    // this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  viewProfile() {
    this.navCtrl.push(ProfilePage);
  }

  addListing() {
    this.navCtrl.push(AddListingPage);
  }

  viewListings() {
    this.navCtrl.push(ViewListingsPage);
  }
}
