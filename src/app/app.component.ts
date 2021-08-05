import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashPage } from './/pages/splash/splash.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = 'Techiediaries';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();
    // this.showLoader();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // console.log(this.platform.platforms());
      if (this.platform.is( 'cordova' )) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      } 
    });

  }

  async SplashModal() {
    const modal = await this.modalController.create({
      component: SplashPage,
      componentProps: { Titulo: 'Teste' }
    });
    return await modal.present();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      return; // console.log(('fired');
    });
  }

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

}