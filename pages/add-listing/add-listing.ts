import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ImagePicker, Transfer } from 'ionic-native';

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
  filename: string = "noimage.jpg";
  pictureURI;
  pictureSelected:boolean=false;

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
    this.storage.get('token').then((val)=> {
      this.token = val;
    });
  }

  ionViewDidLoad() {
   
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
   // let phoneVal = new RegExp("[0-9]{10}");
    let nameVal = new RegExp("[a-zA-Z\s]+");

   // let descriptionVal=new RegExp("[a-zA-Z0-9\s.-,]");
   // let emailVal = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z.]+")
  //  let passVal = new RegExp("[a-zA-Z0-9!@#$*&.,?]{6,}");


    if(!nameVal.test(this.listing.name) || (this.listing.name == null)) {
      this.toastCtrl.create({
        message:"Invalid  Name",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    } else if(this.listing.description== null) {
      this.toastCtrl.create({
        message:" Description required",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    } else if(this.listing.brand == null) {
      this.toastCtrl.create({
        message:" Brand required",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    } else if(this.listing.age == null) {
      this.toastCtrl.create({
        message:" age required",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    }  else if(this.listing.condition == null) {
      this.toastCtrl.create({
        message:" Condition required",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    }  else if(this.listing.warranty == null) {
      this.toastCtrl.create({
        message:"Warranty required",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    } else if(!nameVal.test(this.listing.color) || (this.listing.color == null)) {
      this.toastCtrl.create({
        message:"Color Invalid",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    }else if(this.selectedCategory == null) {
      this.toastCtrl.create({
        message:"Category not selected",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    } else if(this.selectedSubCategory == null) {
      this.toastCtrl.create({
        message:"Sub category not selected",
        showCloseButton: true
      }).present();
      loader.dismiss();
      return;
    
    }
    var link = 'http://139.59.5.156/test/addListing.php';
    var dataa = JSON.stringify({
      token: this.token,
      name: this.listing.name,
      description: this.listing.description,
      category: this.selectedCategory,
      subcategory: this.selectedSubCategory,
      brand: this.listing.brand,
      age: this.listing.age,
      condition: this.listing.condition,
      warranty: this.listing.warranty,
      color: this.listing.color,
      picture: this.filename
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

  uploadPic() {
    ImagePicker.getPictures({
      maximumImagesCount : 1 
    }).then((results)=>{
      this.pictureURI = results[0];
      this.pictureSelected = true;
      var url = "http://139.59.5.156/test/uploadImage.php";
 
  // File for Upload
  var targetPath = this.pictureURI;
 
  // File name only
  this.filename = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12)+".jpeg";
  // this.toastCtrl.create({
  //                 message: this.filename,
  //                 duration: 3000,
  //                 position: "bottom"
  //       }).present();
 
  var options = {
    fileKey: "file",
    fileName: this.filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': this.filename}
  };
 
  const fileTransfer = new Transfer();
 
  
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    
  }, err => {
    // this.toastCtrl.create({
    //   message: err
    // }).present();
  });
    });
    // Camera.getPicture({
    //   allowEdit: true,
    //   sourceType: 0
    // }).then((result)=>{
    //   this.pictureURI = result;
    //   this.pictureSelected = true;
    // });

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
