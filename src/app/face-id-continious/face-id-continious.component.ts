import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CameraCaptureComponent} from '../camera-capture/camera-capture.component';
import { FaceApiService } from '../services/face-api-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-face-id-continious',
  templateUrl: './face-id-continious.component.html',
  styleUrls: ['./face-id-continious.component.css']
})
export class FaceIdContiniousComponent implements OnInit, OnDestroy {
  run: boolean;
  timerToken: NodeJS.Timer;
  ngOnDestroy(): void {
    this.run=false;
    clearInterval(this.timerToken);
  }

  public detectedPerson:string;

  @ViewChild(CameraCaptureComponent)
  public captureChild: CameraCaptureComponent;

  constructor(private faceApi: FaceApiService) { }

  ngOnInit() {
    this.DoIDLoop();
  }

  DoIDLoop(){
    this.run=true;
    this.DoID(); 
  }

  async DoID(){
    if (!this.run) return;
    let groups = await this.faceApi.getPersonGroups().toPromise();
    let selectedGroupId = groups[0].personGroupId;

    var img = this.captureChild.captureContinious();

    var detectedFaces = await this.faceApi.detect(img);

    let faceIds = _.map(detectedFaces, 'faceId');

    //NOTE: for Production app, max groups of 10
    try {
      let identifiedFaces = await this.faceApi.identify(selectedGroupId, faceIds).toPromise(); 
      
      for (const identifiedFace of identifiedFaces) {
        if (identifiedFace.candidates.length > 0) {
          let detectedFace = _.find(detectedFaces, { faceId: identifiedFace.faceId });
          detectedFace.identifiedPerson = true;
          detectedFace.identifiedPersonId = identifiedFace.candidates[0].personId;
          detectedFace.identifiedPersonConfidence = identifiedFace.candidates[0].confidence;
          var pr= await this.faceApi.getPerson(selectedGroupId, identifiedFace.candidates[0].personId).toPromise();
          this.detectedPerson = pr.name;
          //TODO throw event to authorize unlock of refresh token
        }
      }
    } catch (error) {
      this.detectedPerson=null;
    }

    this.timerToken = setTimeout(()=>this.DoID(),2000);
  }

}
