import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expired-offer',
  templateUrl: './expired-offer.page.html',
  styleUrls: ['./expired-offer.page.scss'],
})
export class ExpiredOfferPage implements OnInit {

  public qrData = 'Dados';
  public createdCode = null;
  public scannedCode = null;
  public encodedData = null;

  public myAngularxQrCode: any;

  constructor() { }

  ngOnInit() {
  }

}
