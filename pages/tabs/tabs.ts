import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { BrowsePage } from '../browse/browse';
import {SearchPage} from '../search/search';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = BrowsePage;
  tab3Root: any = SearchPage;
  tab4Root: any ;
  tab4title: string = "Sign In";

  token:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
    this.checkLogin();
    
    
    
  }
  public checkLogin() {
    this.storage.get('token').then((val)=> {
      this.token = val;
      if(this.token!= null) {
          this.tab4Root = AccountPage;
          this.tab4title = "Account";
      }
      else {
        this.tab4Root = LoginPage;
          this.tab4title = "Sign In";
      }
    });
  } 

}
