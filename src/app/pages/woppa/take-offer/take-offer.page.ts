import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-take-offer',
  templateUrl: './take-offer.page.html',
  styleUrls: ['./take-offer.page.scss'],
})
export class TakeOfferPage implements OnInit {

  public qrData = 'Dados';
  public createdCode = null;
  public scannedCode = null;
  public encodedData = null;

  public myAngularxQrCode: any;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
 

}
