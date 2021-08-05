import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.page.html',
  styleUrls: ['./favorite-products.page.scss'],
})
export class FavoriteProductsPage implements OnInit {

  items: any = [
    { Icon: './assets/app/logo/logoWoppa.png', Name: 'Produtos 1', Details: 'Descrição do Produto 1' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' }
  ]
  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }


  closeModal()
  {
    this.modalCtrl.dismiss();
  }
  goUnlockOffer(){
    this.navCtrl.navigateRoot('/menu/unlock-offer');
    this.closeModal();
  }


}
