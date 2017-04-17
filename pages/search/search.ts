import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SeeListingPage } from '../see-listing/see-listing';
import { Storage } from '@ionic/storage';
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
  trueListings:any;
  keyword : string;
  OnlyFromHomeCity : boolean;
  token: any;
  user : User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public http: Http, public storage: Storage) {
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
      DOB:''
    };
    this.OnlyFromHomeCity = false;
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
  ionViewDidLoad() {
    
    
  }

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
       this.getTrueListings();
      // this.test = data.text();
    });
  }
  getTrueListings() {
    this.trueListings = [];
    if(this.OnlyFromHomeCity==false) {
        this.trueListings = this.listings;
    }
    else {
      this.listings.forEach(listing => {

        if(listing.user.city == this.user.city) {
          this.trueListings.push(listing);
        }
        
      });
    }
  }
  seeListing(listing) {
    this.navCtrl.push(SeeListingPage, listing);
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
  state : string,
  city : string,
  DOB : string
}
