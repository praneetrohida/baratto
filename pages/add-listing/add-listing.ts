import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AddListing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-listing',
  templateUrl: 'add-listing.html'
})
export class AddListingPage {

  public listing: Listing;
  public token: string;
  public categories: any;
  public subcategories: any;
  public selectedCategory: any;
  public selectedSubCategory:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http:Http, public alertCtrl:AlertController, public storage: Storage, public toastCtrl: ToastController) {
    this.listing = {
      name:"",
      description:"",
      brand:"",
      age:0,
      condition:"",
      warranty:"",
      color:""
    };
    var link="http://139.59.5.156/test/categories.json";
    this.http.get(link).map((res)=>res.json()).subscribe((data)=>{
      this.categories = data.categories;
    });
    storage.get('token').then((val)=> {
      this.token = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListingPage');
  }

  loadSubcategory() {
    this.categories.forEach(category => {
      if(category.category == this.selectedCategory) {
        this.subcategories = category.subcategories;
      }
    });
  }

  addListingFinal() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    //write code here
    var link = 'http://139.59.5.156/test/addListing.php';
    var dataa = JSON.stringify({
      token: this.token,
      name: this.listing.name,
      description: this.listing.description,
      brand: this.listing.brand,
      age: this.listing.age,
      condition: this.listing.condition,
      warranty: this.listing.warranty,
      color: this.listing.color
    });

    this.http.post(link,dataa).subscribe((data)=>{
      let response = data.text();
      let alertMsg: string;
      switch(response) {
        case "success":
          alertMsg = "Listing added successfully.";
          break;
        case "Error : 4":
          alertMsg = "Some error occured";
          break;
      }
     this.toastCtrl.create({
                  message: alertMsg,
                  duration: 3000,
                  position: "bottom"
        }).present();
      loader.dismiss();
     
      this.navCtrl.pop();
      // this.navCtrl.remove(1,this.navCtrl.length()-2);
      // this.navCtrl.pop();
    });
  }

}

interface Listing {
  name:string;
  description:string;
  brand:string;
  age:number;
  condition:string;
  warranty:string;
  color:string
}
