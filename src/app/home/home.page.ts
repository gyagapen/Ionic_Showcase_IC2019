import { Component } from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  FB_APP_ID = 434047077146385;

  constructor(
      private fb: Facebook,
      private googlePlus: GooglePlus,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private router: Router,
      public alertController: AlertController,
      private platform: Platform
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }


  async doGoogleLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      scopes: '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      webClientId: '910321658815-6308o4bkckejmpot527sln3t8tncul2i.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      offline: true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
        .then(user => {
          this.nativeStorage.setItem('user_info', {
            name: user.displayName,
            email: user.email,
            picture: user.imageUrl,
            loginProvider: 'google'
          })
              .then(() => {
                console.log('login successful');
                this.router.navigate(['/user']);
              }, (error) => {
                console.log('login error');
                console.log(error);
              });
          loading.dismiss();
        }, err => {
          console.log('login error ' + err.toString());
          console.log(err);
          if (!this.platform.is('cordova')) {
            this.presentAlert();
          }
          loading.dismiss();
        });
  }


  async doFbLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    // the permissions your facebook app needs from the user
    const permissions = ['public_profile', 'email'];

    this.fb.login(permissions)
        .then(response => {
          const userId = response.authResponse.userID;
          // Getting name and email properties
          // Learn more about permissions in https://developers.facebook.com/docs/facebook-login/permissions

          this.fb.api('/me?fields=name,email', permissions)
              .then(user => {
                user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                // now we have the users info, let's save it in the NativeStorage
                this.nativeStorage.setItem('user_info',
                    {
                      name: user.name,
                      email: user.email,
                      picture: user.picture,
                      loginProvider: 'facebook'
                    })
                    .then(() => {
                      console.log('login successful');
                      this.router.navigate(['/user']);
                      loading.dismiss();
                    }, error => {
                      console.log('login error' + error.toString());
                      console.log(error);
                      loading.dismiss();
                    });
              });
        }, error => {
          console.log('login error' + error.toString());
          console.log(error);
          if (!this.platform.is('cordova')) {
            this.presentAlert();
          }
          loading.dismiss();
        });
  }

    goToVisionPage() {
        this.router.navigate(['/vision']);
    }


}
