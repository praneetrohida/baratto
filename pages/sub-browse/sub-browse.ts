import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BrowseResultsPage } from '../browse-results/browse-results';

/*
  Generated class for the SubBrowse page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sub-browse',
  templateUrl: 'sub-browse.html'
})
export class SubBrowsePage {
  category: any;
  subcategories: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('category');
    this.subcategories = this.category.subcategories;
  }

  itemSelected(subcategory) {
    this.navCtrl.push(BrowseResultsPage,{
      category:this.category.category,
      subcategory:subcategory
    })
  }

}
