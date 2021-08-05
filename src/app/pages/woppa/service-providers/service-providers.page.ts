import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.page.html',
  styleUrls: ['./service-providers.page.scss'],
})
export class ServiceProvidersPage implements OnInit {

  items: any = [
    { Icon: './assets/app/logo/logoWoppa.png', Name: 'Produtos 1', Details: 'Descrição do Produto 1' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' },
    { Icon: 'menu', Name: 'Produto 2', Details: 'Descrição do produto 2' }
  ]

  // Slider Options

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
    spaceBetween: 10
  };
  
  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController
  ) { }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }


  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

  goSupplierProducts () {
    this.navCtrl.navigateRoot('/menu/supplier-products');
    this.closeModal();
  }

}
