import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-menufin',
  templateUrl: './menufin.page.html',
  styleUrls: ['./menufin.page.scss'],
})
export class MenufinPage implements OnInit {
  public items: any;
  public itemsMenu: any;
  public MenuOptions: any;
  public AppName: string = environment.AppNameSigla + ' | ' + this.Authorizer.formSubTitle;

  constructor(
    public navCtrl: NavController,
    // public ev: Events,
    private alertService: AlertService,
    private Authorizer: AuthService
  ) {
  }
  public CarragaMenuAPI() {
    const params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      CodigoMenuSistemaPai: this.Authorizer.CodigoMenuPai,
      Hashkey: this.Authorizer.HashKey
    };
    this.Authorizer.QueryStoreProc('ExecutarPost', 'spCarregaMenuFin', params).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          this.itemsMenu = JSON.parse(atob(resultado.results));
          this.items = JSON.parse(atob(resultado.results));
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.AppName, pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: 'Minha Conta', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
  getItems(ev: any) {
    // this.CarregaMenuPrincipalStatic();
    this.items = this.itemsMenu;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (
          (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.Details.toLowerCase().indexOf(val.toLowerCase()) > -1));
      });
    }
  }

  itemSelected(item: any) {
    // this.alertService.showLoader("Acessando...: " + item.Name,1000);
    this.CarragaMenuAPI();
    this.Authorizer.formTitle = item.Name;
    this.Authorizer.formSubTitle = item.Details;
    this.navCtrl.navigateRoot(item.Route);
  }
  ngOnInit() {
    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot('/login');
    }
  }
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidEnter");
    if (this.Authorizer.HashKey) {
      this.CarragaMenuAPI();
    }
  }
  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidLeave");
    if (this.Authorizer.HashKey) {
      this.CarragaMenuAPI();
    }
  }
  goBack() {
    this.navCtrl.back();
  }
}
