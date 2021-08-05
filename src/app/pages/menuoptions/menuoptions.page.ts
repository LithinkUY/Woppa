import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FavoriteProductsPage } from '../woppa/favorite-products/favorite-products.page';
import { ProductPortfolioPage } from '../woppa/product-portfolio/product-portfolio.page';
import { ServiceProvidersPageModule } from '../woppa/service-providers/service-providers.module';
import { ServiceProvidersPage } from '../woppa/service-providers/service-providers.page';
//import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-menuoptions',
  templateUrl: './menuoptions.page.html',
  styleUrls: ['./menuoptions.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(
    //private Authorizer: AuthService
    public navCtrl: NavController,
    public modelCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // //console.log(("ionViewDidEnter");
  }
  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // //console.log(("ionViewDidLeave");
  }



  async goWallet() {
    const modal = await this.modelCtrl.create({
      component: ProductPortfolioPage,
    });
    return await modal.present();
  }

  async goFavorites() {
    const modal = await this.modelCtrl.create({
      component: FavoriteProductsPage,
    });
    return await modal.present();
  }
  async goServiceProviders() {
    const modal = await this.modelCtrl.create({
      component: ServiceProvidersPage,
    });
    return await modal.present();
  }


}
