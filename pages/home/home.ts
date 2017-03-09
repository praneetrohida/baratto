import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SeeListingPage } from '../see-listing/see-listing';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token:string;
  categories;
  results:Array<any> = [];
  dataa;
  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public http: Http) {
    var link="http://139.59.5.156/test/categories.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.categories = data.categories;

      var link="http://139.59.5.156/test/populateHome.php";
      var dataa = JSON.stringify(data);
      this.http.post(link,dataa).map((res)=>res.json()).subscribe((data)=>{
        this.results = data;
      });
    });

    
  }

  seeListing(listing) {
    this.navCtrl.push(SeeListingPage, listing);
  }
    
    
  

}
