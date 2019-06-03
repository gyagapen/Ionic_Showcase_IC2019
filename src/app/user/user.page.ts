import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: any;
  loginProvider: '';
  userReady = false;

  constructor(
      private googlePlus: GooglePlus,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private router: Router,
      private fb: Facebook
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    this.nativeStorage.getItem('user_info')
        .then(data => {
          this.user = {
            name: data.name,
            email: data.email,
            picture: data.picture,
              loginProvider: data.loginProvider
          };
          this.userReady = true;
          loading.dismiss();
        }, error => {
          console.log(error);
          loading.dismiss();
        });
  }

  doGoogleLogout() {
    this.googlePlus.logout()
        .then(res => {
          // user logged out so we will remove him from the NativeStorage
          this.nativeStorage.remove('user_info');
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
        });
  }

  doFbLogout() {
        this.fb.logout()
            .then(res => {
                // user logged out so we will remove him from the NativeStorage
                this.nativeStorage.remove('user_info');
                this.router.navigate(['/home']);
            }, error => {
                console.log(error);
            });
  }

    doLogout() {
        if (this.user.loginProvider === 'google') {
            this.doGoogleLogout();
        } else {
            this.doFbLogout();
        }
    }


}
