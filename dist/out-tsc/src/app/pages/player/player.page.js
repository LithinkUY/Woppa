import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { VgStates } from 'videogular2/src/core/states/vg-states';
import { VgEvents } from 'videogular2/src/core/events/vg-events';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
var PlayerPage = /** @class */ (function () {
    function PlayerPage(ref, cdRef, navCtrl, Authorizer, env) {
        this.ref = ref;
        this.cdRef = cdRef;
        this.navCtrl = navCtrl;
        this.Authorizer = Authorizer;
        this.env = env;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.buffered = { length: 1, end: function (end) { return 0; } };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.isLive = false;
        this.state = VgStates.VG_PAUSED;
        this.AppName = environment.AppNameSigla;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = this.Authorizer.formSubTitle; // 'Usuário';
        this.FiveIcon = environment.logoCliente;
        this.subtitleVideo = environment.subtitle;
        this.videos = environment.videos;
        this.lgPlay = environment.lgplay;
        this.poster = environment.poster;
        this.preload = 'auto';
        // vg-s1
        this.elem = ref.nativeElement;
        this.id = this.elem.id;
    }
    PlayerPage.prototype.ngOnInit = function () {
        // vg-s2
        // this.timer = TimerObservable.create(0, 10);
    };
    PlayerPage.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['duration'].currentValue) {
            this.duration = changes['duration'].currentValue * 1000;
            this.time.total = this.duration;
            this.buffer.end = this.duration;
            this.buffered.end = function (end) { return _this.duration; };
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
        }
    };
    PlayerPage.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    PlayerPage.prototype.onPlayerReady = function (api) {
        var _this = this;
        this.api = api;
        // this.api.play();    
        this.api.getDefaultMedia().subscriptions.ended.subscribe(function () {
            // Set the video to the beginning
            _this.api.getDefaultMedia().currentTime = 0;
        });
    };
    PlayerPage.prototype.setCurrentVideo = function (source, type) {
        this.api.pause();
        this.sources = new Array();
        this.sources.push({
            src: source,
            type: type
        });
        this.api.getDefaultMedia().currentTime = 0;
    };
    PlayerPage.prototype.play = function () {
        var _this = this;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));
        this.timerSubs = this.timer.subscribe(function () {
            _this.currentTime += 10;
            _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
            if (_this.time.current >= _this.time.total) {
                _this.currentTime = 0;
                _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
                _this.timerSubs.unsubscribe();
            }
        });
    };
    Object.defineProperty(PlayerPage.prototype, "currentTime", {
        get: function () {
            return this.time.current;
        },
        set: function (seconds) {
            this.time.current = seconds;
        },
        enumerable: true,
        configurable: true
    });
    PlayerPage.prototype.pause = function () {
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.timerSubs.unsubscribe();
    };
    PlayerPage.prototype.onEnterCuePoint = function (e) {
        // console.log('EnterCuePoint:',e);
    };
    PlayerPage.prototype.onExitCuePoint = function (e) {
        // console.log('ExitCuePoint',e);
    };
    PlayerPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PlayerPage.prototype, "duration", void 0);
    PlayerPage = tslib_1.__decorate([
        Component({
            selector: 'app-player',
            templateUrl: './player.page.html',
            styleUrls: ['./player.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NavController,
            AuthService,
            EnvService])
    ], PlayerPage);
    return PlayerPage;
}());
export { PlayerPage };
/*export class PlayerPage implements OnInit {

  public AppName: string = environment.AppNameSigla;
  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = this.Authorizer.formSubTitle; // 'Usuário';

  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private env: EnvService
    

  ) { }

  ngOnInit() {
  }

  goBack() {
      this.navCtrl.back();
  }

}
*/
//# sourceMappingURL=player.page.js.map