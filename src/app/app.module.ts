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
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
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
import { IDRMLicenseServer, VgStreamingModule } from 'videogular2/streaming';
//import { VgStreamingModule } from 'videogular2/streaming';
//import { VgDASH } from 'videogular2/src/streaming/vg-dash/vg-dash';



import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';
import { Push } from '@ionic-native/push/ngx'
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';

import { DevicesmodalPageModule } from './pages/devicesmodal/devicesmodal.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProductPortfolioPage } from './pages/woppa/product-portfolio/product-portfolio.page';
//import { ProductPortfolioPageModule } from './pages/woppa/product-portfolio/product-portfolio.module';
//import { SaveapproxPageModule } from './pages/woppa/saveapprox/saveapprox.module';

@NgModule({
  declarations: [
    AppComponent
    ,PopinfoComponent
    ,PopfindComponent
    ,PlayerComponent    
  ],
  imports: [ 
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //SaveapproxPage,
    IonicSelectableModule,
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'agilflix',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }), 
    AppRoutingModule, SplashPageModule,    
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,  
    VgStreamingModule,
    //VgDASH,      
    BrowserModule,
    QRCodeModule,
    DevicesmodalPageModule,
    //ProductPortfolioPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
   // SaveapproxPageModule
    
  ],

  providers: [
    StatusBar,
    SplashScreen,
    // BarcodeScanner,
    // SplashPage,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WebView, Camera, Printer, Device, CallNumber, Network,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileOpener,
    DocumentViewer,
    FileTransfer,
    Push  
         
  ],

  bootstrap: [AppComponent],

  entryComponents: [
    PopinfoComponent,
    PopfindComponent,
    PlayerComponent
    
       
  ]

})
export class AppModule { }
