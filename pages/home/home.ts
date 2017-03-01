import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token:string;
  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {

  }

  click() {
    this.storage.get('token').then((val)=> {
      this.token = val;
      let alert = this.alertCtrl.create({
          title: 'Token!',
          subTitle: this.token,
          buttons: ['OK']
      });
       alert.present();
    })
    
    
  }

}
