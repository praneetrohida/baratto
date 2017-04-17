import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SeeListingPage } from '../see-listing/see-listing';

/*
  Generated class for the BrowseResults page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-browse-results',
  templateUrl: 'browse-results.html'
})
export class BrowseResultsPage {
  listings:any;
  category; subcategory;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Fetching data, please wait..."
    });
    this.category = this.navParams.get('category');
    this.subcategory = this.navParams.get('subcategory');
    var link="http://139.59.5.156/test/viewListingsByUser.php";
    var dataa=JSON.stringify({
      category:this.category,
      subcategory:this.subcategory
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
  ionViewDidLoad() {
    
  }

  seeListing(listing) {
    this.navCtrl.push(SeeListingPage, listing);
  }

}
