import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ViewOneListingPage } from '../view-one-listing/view-one-listing';
/*
  Generated class for the ViewListings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-listings',
  templateUrl: 'view-listings.html'
})
export class ViewListingsPage {
  token: string;
  listings:Array<any>;
  test : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http:Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    
    
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Fetching data, please wait..."
    });
    loader.present();
    this.storage.get('token').then((val)=> {
      this.token = val;
      var link = 'http://139.59.5.156/test/viewListingsByUser.php';
    var dataa = JSON.stringify({
      token: this.token
    });
    this.http.post(link,dataa).map((res)=>res.json()).subscribe((data)=> {
       
         this.listings = data.listings;
       loader.dismiss();
      // this.test = data.text();
    });
    });
  }

  viewOneListing(listing: any) {
    
    this.navCtrl.push(ViewOneListingPage,listing);
  }

}

