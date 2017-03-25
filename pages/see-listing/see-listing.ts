import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SeeListing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-see-listing',
  templateUrl: 'see-listing.html'
})
export class SeeListingPage {

  _id; name; description; brand; warranty; age; condition; color; views; token; category; subcategory; username; user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public storage: Storage, public http: Http, public toastCtrl: ToastController) {
    this._id = this.navParams.get('_id');
    this.name = this.navParams.get('name');
    this.description = this.navParams.get('description');
    this.category = this.navParams.get('category');
    this.subcategory = this.navParams.get('subcategory');
    this.brand = this.navParams.get('brand');
    this.warranty = this.navParams.get('warranty');
    this.age = this.navParams.get('age');
    this.condition = this.navParams.get('condition');
    this.color = this.navParams.get('color');
    this.views = this.navParams.get('views');
    this.username = this.navParams.get('username');

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
      pincode:'',
      DOB:''
    };
    this.getProfile();
  }


  getProfile() {
    this.storage.get('token').then((val) => {
      this.token = val;
   

    var link = 'http://139.59.5.156/test/getUserDetails.php';
    var dataa = JSON.stringify({
      token : this.token,
      username : this.username
    });

    this.http.post(link,dataa).map(res => res.json()).subscribe((data)=> {
      this.user = data;
    });

    var link="http://139.59.5.156/test/incrementViews.php"
    var dataa = JSON.stringify({
              oid: this._id['$oid'],
              token: this.token
    });
    // this.toastCtrl.create({
    //   message:this._id['$oid']
    // }).present();
    this.http.post(link,dataa).subscribe((data)=>{

    });

     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeListingPage');
  }

  contactInfo() {

    let actionSheet = this.actionSheetCtrl.create({
      title: "Contact " + this.user.firstName,
      buttons: [
        {
          text: "Email",
          handler: ()=> {
            window.open(`mailto:${this.user.email}`, '_system');
          }
        },
        {
          text: "Phone",
          handler: ()=> {
            window.open(`tel:${this.user.phone}`, '_system');
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

}
