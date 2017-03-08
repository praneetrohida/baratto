import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SubBrowsePage } from '../sub-browse/sub-browse';

/*
  Generated class for the Browse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})
export class BrowsePage {
  categories:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Fetching data, please wait..."
    });
    loader.present();
    var link="http://139.59.5.156/test/categories.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.categories = data.categories;
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
  }

  itemSelected(item) {
    this.navCtrl.push(SubBrowsePage,{
      category: item
    });
  }

}
