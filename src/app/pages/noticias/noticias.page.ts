import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController, IonSlides, Events } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    //private alertService: AlertService,
    //private Authorizer: AuthService,
    //private env: EnvService,
    // private router: Router,
    public platform: Platform

  ) {

   }

  ngOnInit() {
  }

  portalNoticias (ev:Events, link : any) {
    this.openLink(link);   
  }

  goBack() {
    this.navCtrl.back();
  }

  openLink(link:any = null) {
    /*
      window.open('url', '_system');  
      //Loads in the system browser 
      window.open('url', '_blank');   
      //Loads in the InAppBrowser
      window.open('url', '_blank', 'location=no');
      //Loads in the InAppBrowser with no location bar
      window.open('url', '_self');
      //Loads in the Cordova web view 
    */
   if (this.platform.is('cordova')) {
      // do nothing
      window.open(link,'_self')
   } else {
    window.open(link,'_blank', 'location=no');
   }
  }



}
