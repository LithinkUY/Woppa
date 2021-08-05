import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-portfolio',
  templateUrl: './product-portfolio.page.html',
  styleUrls: ['./product-portfolio.page.scss'],
})
export class ProductPortfolioPage implements OnInit {

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
  Pesquisar()
  {
    
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  goUnlockOffer(){
    this.navCtrl.navigateRoot('/menu/unlock-offer');
    this.closeModal();
  }

  goBack() {
    this.navCtrl.navigateRoot;
  }

}
