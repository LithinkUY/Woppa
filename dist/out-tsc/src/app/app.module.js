import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SplashPageModule } from './pages/splash/splash.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { DevicesmodalPageModule } from './pages/devicesmodal/devicesmodal.module';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PopfindComponent } from 'src/app/components/popfind/popfind.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { PlayerComponent } from './components/player/player.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                PopinfoComponent,
                PopfindComponent,
                PlayerComponent
            ],
            imports: [
                IonicSelectableModule,
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(),
                IonicStorageModule.forRoot({
                    name: 'meusinal',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                AppRoutingModule, SplashPageModule,
                DevicesmodalPageModule,
                VgCoreModule,
                VgControlsModule,
                VgOverlayPlayModule,
                VgBufferingModule
            ],
            providers: [
                StatusBar,
                SplashScreen,
                // SplashPage,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                WebView, Camera, Printer, Device, CallNumber, Network,
                { provide: LocationStrategy, useClass: HashLocationStrategy },
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                File,
                FileOpener,
                DocumentViewer,
                FileTransfer
            ],
            bootstrap: [AppComponent],
            entryComponents: [
                PopinfoComponent,
                PopfindComponent,
                PlayerComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map