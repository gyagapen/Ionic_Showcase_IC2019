import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {GoogleCloudVisionServiceProvider} from '../google-cloud-vision-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-vision-api',
  templateUrl: './vision-api.page.html',
  styleUrls: ['./vision-api.page.scss'],
})
export class VisionApiPage implements OnInit {

  items: AngularFireList<any>;
  loading: any;

  constructor(private camera: Camera,
              private vision: GoogleCloudVisionServiceProvider,
              private db: AngularFireDatabase,
              private alertCtrl: AlertController) {
    this.items = db.list('items');

  }

  ngOnInit() {
  }

  saveResults(imageData, results) {
    this.items.push({ imageData, results})
        .then(_ => { })
        .catch(err => { this.showAlert(err); });
  }

  async showAlert(content) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: content,
      buttons: ['OK']
    });
    return await alert.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    /*this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });*/
  }

}
