import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popfind',
  templateUrl: './popfind.component.html',
  styleUrls: ['./popfind.component.scss'],
})
export class PopfindComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}
  
  onClick( valor ) {
    this.popoverCtrl.dismiss({
      item: valor
    });
  }
}
