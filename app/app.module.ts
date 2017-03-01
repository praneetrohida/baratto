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
import {Storage} from '@ionic/storage';
import { FormsModule } from '@angular/forms';
 
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
    WelcomePage
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
    WelcomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage 
  ]
})
export class AppModule {}
