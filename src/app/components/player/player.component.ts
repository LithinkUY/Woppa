import { Component, OnInit, Input, ElementRef, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { VgStates } from 'videogular2/src/core/states/vg-states';
import { IPlayable, IMediaSubscriptions } from 'videogular2/src/core/vg-media/i-playable';
import { VgEvents } from 'videogular2/src/core/events/vg-events';
import { Observable, Subscription } from 'rxjs';
import { NavController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';

import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, IPlayable {
  track?: any;
  textTracks: TextTrackList;
  addTextTrack?: Function;
  dispatchEvent?: Function;
  id: string;
  elem: any;
  time: any = { current: 0, total: 0, left: 0 };
  buffer: any = { end: 0 };
  buffered: any = { length: 1, end: end => 0 };
  canPlay: boolean = false;
  canPlayThrough: boolean = false;
  isMetadataLoaded: boolean = false;
  isWaiting: boolean = false;
  isCompleted: boolean = false;
  isLive: boolean = false;
  state: string = VgStates.VG_PAUSED;
  subscriptions: IMediaSubscriptions;


  public AppName: string = environment.AppNameSigla;
  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = this.Authorizer.formSubTitle; // 'Usuário';


  public FiveIcon: string = environment.logoCliente;
  public subtitleVideo: any = environment.subtitle;
  
  public videos: any = environment.videos;
  public lgPlay: string = environment.lgplay;
  public poster: string = environment.poster;

  public paramVideoSrc : any;


  sources: Array<Object>;
  
  
  preload:string = 'auto';
  api:VgAPI;

  @Input()
  duration: number;

  timer: Observable<number>;
  timerSubs: Subscription;

  constructor(
    private ref: ElementRef,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private env: EnvService, 
    private popoverCtrl: PopoverController,
    private navParams: NavParams
  ) {
    // vg-s1
    this.elem = ref.nativeElement;
    this.id = this.elem.id;
    
  }  
  
  ngOnInit() {
    // vg-s2
    // this.timer = TimerObservable.create(0, 10);

    this.paramVideoSrc = this.navParams.data;
    console.log(this.navParams.data);

  }

  onCloseFullscreen(ev: any ) {    
    //if (this.api.fsAPI.isFullscreen) {
      this.popoverCtrl.dismiss({
        item: ev
      });
    //}    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['duration'].currentValue) {
      this.duration = changes['duration'].currentValue * 1000;
      this.time.total = this.duration;
      this.buffer.end = this.duration;
      this.buffered.end = end => this.duration;

      this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
      this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
      this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
    }
  }
  
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  

  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.play();  
    // this.api.fsAPI.toggleFullscreen(api.medias);
    

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          this.api.getDefaultMedia().currentTime = 0;
      }
    );

  }

  setCurrentVideo(source : string, type : string) {
      this.api.pause();
      this.sources = new Array<Object>();
      this.sources.push({
        src: source,
        type: type
      });
      this.api.getDefaultMedia().currentTime = 0;
  }

  play() {
    this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
    this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));

    this.timerSubs = this.timer.subscribe(
      () => {
        this.currentTime += 10;

        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));

        if (this.time.current >= this.time.total) {
          this.currentTime = 0;
          this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
          this.timerSubs.unsubscribe();
        }
      }
    );
  }

  set currentTime(seconds) {
    this.time.current = seconds;
  }

  get currentTime() {
    return this.time.current;
  }

  pause() {
    this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
    this.timerSubs.unsubscribe();
  }
  
  onEnterCuePoint(e:any){
    // console.log('EnterCuePoint:',e);
  }
  onExitCuePoint(e:any){
    // console.log('ExitCuePoint',e);

  }

  goBack() {    
    this.navCtrl.back();    
  }

  
}
