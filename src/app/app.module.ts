import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {GoogleCloudVisionServiceProvider} from './google-cloud-vision-service.service';
import {HttpClientModule} from '@angular/common/http';



const firebaseConfig = {
    apiKey: 'AIzaSyCNFPahP4Mo_kQqTJ5RpKXwY7f9ShySBU8',
    authDomain: 'test-login-55354.firebaseapp.com',
    databaseURL: 'https://test-login-55354.firebaseio.com',
    projectId: 'test-login-55354',
    storageBucket: 'test-login-55354.appspot.com',
    messagingSenderId: '910321658815'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      AngularFireStorageModule,
      HttpClientModule],
  providers: [
      StatusBar,
      SplashScreen,
      GooglePlus,
      Facebook,
      NativeStorage,
      Camera,
      GoogleCloudVisionServiceProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
