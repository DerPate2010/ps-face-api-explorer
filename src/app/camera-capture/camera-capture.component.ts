import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.css']
})
export class CameraCaptureComponent implements OnInit, OnDestroy {
  stream: MediaStream;
  public showCaptureButton:boolean;
  ngOnDestroy(): void {
    this.stop();
  }
  @Output() snap = new EventEmitter<string>();

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor() {
      this.captures = [];
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              this.video.nativeElement.srcObject = stream;
              this.stream = stream;
              this.video.nativeElement.play();
              this.showCaptureButton=true;
          });
      }
  }

  stop(){
    this.video.nativeElement.pause();
    this.video.nativeElement.src=null;
    let tracks = this.stream.getTracks();
    for (const track of tracks) {
      track.stop();
    }
  }

  public capture() {
    this.video.nativeElement.pause();
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    var imgUri= this.canvas.nativeElement.toDataURL("image/png");
    this.snap.emit(imgUri);
    this.captures.push(imgUri);
    this.stop();
  }  
  public captureContinious():string {
    this.showCaptureButton=false;
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    return  this.canvas.nativeElement.toDataURL("image/png");

  }
}
