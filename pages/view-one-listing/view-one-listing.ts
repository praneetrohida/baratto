import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { EditListingPage } from '../edit-listing/edit-listing';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ViewOneListing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-one-listing',
  templateUrl: 'view-one-listing.html'
})
export class ViewOneListingPage {
  listing: any;
  _id; name; description; brand; warranty; age; condition; color; views; token; category; subcategory;  
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public http: Http, public storage: Storage) {
     this.storage.get('token').then((val) => {
      this.token = val;
    });
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
  }

  ionViewDidLoad() {
    
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Edit - " + this.name,
      buttons: [
        {
          text: "Update",
          handler: ()=> {
            this.editListing();
          }
        },
        {
          text: "Delete",
          role: 'destructive',
          handler: ()=> {
            this.deleteListing();
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

  deleteFinally() {
    // let toast = this.toastCtrl.create({
    //               message: "" + this._id['$oid'],
    //               duration: 3000,
    //               position: "bottom"
    //             });
    // toast.present();
    var link = "http://139.59.5.156/test/deleteListing.php";
            var dataa = JSON.stringify({
              oid: this._id['$oid'],
              token: this.token
            });
            this.http.post(link,dataa).subscribe((data) => {
              if(data.text() == "success") {
                this.toastCtrl.create({
                  message: "Deleted Successfully",
                  duration: 3000,
                  position: "bottom"
                }).present();
                this.navCtrl.remove(this.navCtrl.length()-2,2);
              }
              else {
                this.toastCtrl.create({
                  message: "Some error occured!",
                  duration: 3000,
                  position: "bottom"
                }).present();
              }
            });
  }

  deleteListing() {
    let alert = this.alertCtrl.create({
      title: "Delete - "+this.name,
      subTitle: "Are you sure you want to delete " + this.name + "?",
      buttons:[
        {
          text:"Yes",
          handler: () => {
            this.deleteFinally();
          }
        },
        {
          text:"No",
          handler: () => {
            alert.dismiss().catch(()=>{});
          }
        }
      ]
    });
    alert.present();
  }

  editListing() {
    this.navCtrl.push(EditListingPage, {
      _id: this._id,
      name: this.name,
      description: this.description,
      brand: this.brand,
      warranty: this.warranty,
      age: this.age,
      condition: this.condition,
      color: this.color,
      view: this.views
    });
  }

}
