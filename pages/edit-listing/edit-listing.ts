import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/*
  Generated class for the EditListing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-listing',
  templateUrl: 'edit-listing.html'
})
export class EditListingPage {
  _id; name; description; brand; warranty; age; condition; color; token;  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http:Http, public toastCtrl: ToastController) {
    this.storage.get('token').then((val) => {
      this.token = val;
    });
    this._id = this.navParams.get('_id');
    this.name = this.navParams.get('name');
    this.description = this.navParams.get('description');
    this.brand = this.navParams.get('brand');
    this.warranty = this.navParams.get('warranty');
    this.age = this.navParams.get('age');
    this.condition = this.navParams.get('condition');
    this.color = this.navParams.get('color');
  }

  ionViewDidLoad() {
    
  }

  doneEditing() {
    var link = "http://139.59.5.156/test/updateListing.php";
    var dataa = JSON.stringify({
      oid:this._id['$oid'],
      token: this.token,
      name: this.name,
      description: this.description,
      brand: this.brand,
      warranty: this.warranty,
      age: this.age,
      condition: this.condition,
      color: this.color
    });
    this.http.post(link,dataa).subscribe((data)=> {
      if(data.text() == "success") {
        this.toastCtrl.create({
                  message: "Updated Successfully!",
                  duration: 3000,
                  position: "bottom"
        }).present();
        this.navCtrl.remove(this.navCtrl.length()-3,3);
      }
      else {
        this.toastCtrl.create({
                  message: "Some Error Occured!",
                  duration: 3000,
                  position: "bottom"
        }).present();
      }
    });
  }


  

}
