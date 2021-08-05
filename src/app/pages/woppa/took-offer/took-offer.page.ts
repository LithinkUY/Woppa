import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-took-offer',
  templateUrl: './took-offer.page.html',
  styleUrls: ['./took-offer.page.scss'],
})
export class TookOfferPage implements OnInit {


  public qrData = 'Dados';
  public createdCode = null;
  public scannedCode = null;
  public encodedData = null;

  public myAngularxQrCode: any;

  constructor() { }

  ngOnInit() {
  }

}
