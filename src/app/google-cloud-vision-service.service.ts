import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GoogleVisionResponses, GoogleVisionResult} from './models/GoogleVision_Models';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class GoogleCloudVisionServiceProvider {
  constructor(public http: HttpClient) {
    console.log('GoogleCloudVisionServiceProvider called');
  }

  getLabels(base64Image) {
    console.log('getLabels has been called');
    const body = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'LABEL_DETECTION'
            }
          ]
        }
      ]
    };
    //  + environment.googleCloudVisionAPIKey
    return this.http.post<GoogleVisionResult>('https://vision.googleapis.com/v1/images:annotate?key='+ environment.googleCloudVisionAPIKey, body);
  }
}
