import { Component, ViewChild, Input, EventEmitter, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
//import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-unlock-offer',
  templateUrl: './unlock-offer.page.html',
  styleUrls: ['./unlock-offer.page.scss'],
})
export class UnlockOfferPage implements OnInit {
 

 /*
  // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;
  

  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  
  dataList:any;
*/
  
  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
    //private navParams: NavParams
  ) { 

  }

  ngOnInit() {

  };

  goBack() {
    this.navCtrl.back();
  }
 

}
