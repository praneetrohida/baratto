import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SeeListingPage } from '../see-listing/see-listing';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  listings:any;
  keyword : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public http: Http) {}

  getResults() {
    let loader = this.loadingCtrl.create({
      content: "Searching, please wait..."
    });
    var link="http://139.59.5.156/test/search.php";
    var dataa=JSON.stringify({
      keyword:this.keyword
    });
    this.http.post(link,dataa).map((res)=>res.json()).subscribe((data)=> {
       
         this.listings = data.listings;
       loader.dismiss();
       if(this.listings != undefined) {
       this.listings.forEach(listing => {
           listing.picture = "http://139.59.5.156/test/uploads/" + listing.picture;
         });
       }
      // this.test = data.text();
    });
  }

  seeListing(listing) {
    this.navCtrl.push(SeeListingPage, listing);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
