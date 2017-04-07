import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowsePage } from '../pages/browse/browse';
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { WelcomePage } from '../pages/welcome/welcome';
import { AddListingPage } from '../pages/add-listing/add-listing';
import { ViewListingsPage} from '../pages/view-listings/view-listings';
import { ViewOneListingPage} from '../pages/view-one-listing/view-one-listing';
import { EditListingPage} from '../pages/edit-listing/edit-listing';
import { SubBrowsePage} from '../pages/sub-browse/sub-browse';
import { BrowseResultsPage } from '../pages/browse-results/browse-results';
import { SeeListingPage } from '../pages/see-listing/see-listing'
import {Storage} from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import {GoogleMaps} from '@ionic-native/google-maps';
 
@NgModule({
  declarations: [
    MyApp,
    BrowsePage,
    AccountPage,
    SearchPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    WelcomePage,
    AddListingPage,
    ViewListingsPage,
    ViewOneListingPage,
    EditListingPage,
    SubBrowsePage,
    BrowseResultsPage,
    SeeListingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowsePage,
    AccountPage,
    SearchPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EditProfilePage,
    WelcomePage,
    AddListingPage,
    ViewListingsPage,
    ViewOneListingPage,
    EditListingPage,
    SubBrowsePage,
    BrowseResultsPage,
    SeeListingPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage,
    GoogleMaps
  ]
})
export class AppModule {}
