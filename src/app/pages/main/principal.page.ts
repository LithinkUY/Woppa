import { Component, OnInit } from '@angular/core';
import { NavController, Events, Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Fale } from 'src/app/models/fale';

import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx'

import { Plugins } from '@capacitor/core';

const { App } = Plugins;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls:
    [
      './principal.page.scss'
    ],
})
export class PrincipalPage implements OnInit {

  public items: any;
  public itemsMenu: any;
  public MenuOptions: any;
  public flagMenuList: any = false;

  public AppName: string = environment.AppNameSigla;
  public title = environment.AppNameSigla;
  public device: string;
  subtitle: any = "";


  private permissoes = {
    Route: '',
    Ver: 0,
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado


  public collectionNotifications: Fale[] = [];
  public collectionNotificationsFilter: Fale[];


  // Slider Options

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.5,
    spaceBetween: 10
  };

  slideOptsBig = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };


  constructor(
    public navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private db: Storage,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private push: Push,
  ) {

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

  }

  /* goWallet() {
    this.navCtrl.navigateRoot('/product-portfolio');
    
  }
 */

  ngOnInit() {


    this.flagMenuList = this.isPortrait();

    // this.initializeFirebase();


    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot('/');
    }
  }


  private initializeFirebase() {
    const options: PushOptions = {
      android: {
        senderID: '249466203646'
      }
    }

    const pushObject: PushObject = this.push.init(options)

    pushObject.on('registration').subscribe(res => console.log(` ${res.registrationId}`))

    pushObject.on('notification').subscribe(res => console.log(`Woppa: ${res.message}`))
  }


  public isPortrait() {
    this.device = this.platform.platforms()[0];
    // this.alertService.presentToast(this.platform.platforms()[0]);
    if (this.platform.platforms()[0] === "android" ||
      // this.platform.platforms()[0] === "ipad" ||
      this.platform.platforms()[0] === "iphone") {
      return false;
    } else {
      return true;
    }
  }

  public CarragaMenuPrincipalAPI() {
    // paramStatus: Pesquisando, Editando, Deletando
    const params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      CodigoMenuPai: this.Authorizer.CodigoMenuPai,
      CodigoMenuGrupo: this.Authorizer.CodigoMenuGrupoP,
      Hashkey: this.Authorizer.HashKey
    };
    this.Authorizer.QueryStoreProc('ExecutarPost', 'spCarregaMenuPrincipal', params).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          // this.alertService.showLoader(resultado.message,1000);
          this.itemsMenu = JSON.parse(atob(resultado.results));
          this.items = JSON.parse(atob(resultado.results));
          // this.flagMenuList = this.items[0].MenuList;
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.AppName, pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // resultado.message = ''  
        // this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.AppName, pMessage: resultado.message });
        this.navCtrl.navigateRoot('/menu/developing');
      }
    });


    const paramsFC = {
      StatusCRUD: 'READ',
      formValues: {}
    };
    this.sendRequest('spFaleConosco', paramsFC, (resultado) => {
      this.collectionNotifications = JSON.parse(atob(resultado.results));
      this.collectionNotificationsFilter = this.collectionNotifications;
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
    this.Authorizer.formTitle = item.Name;
    this.Authorizer.formSubTitle = item.Details;
    this.CarragaMenuPrincipalAPI();
    try {
      this.navCtrl.navigateRoot(item.Route);
    } catch (err) {
      this.navCtrl.navigateRoot('/menu/developing');
    }
  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    // console.log(("ionViewDidEnter");

    if (this.Authorizer.HashKey) {
      this.CarragaMenuPrincipalAPI();
    }
  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    // console.log(("ionViewDidLeave");
    if (this.Authorizer.HashKey) {
      this.CarragaMenuPrincipalAPI();
      // this.title = environment.AppNameSigla + ' | Menu - Principal';
      // this.subtitle = 'Menu Principal';
    }
  }

  goBack() {
    this.navCtrl.back();
  }


    
  /**
   *   
   * Data: 04/12/2019
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  private sendRequest(
    procedure: string,
    params: { StatusCRUD: string; formValues: any; },
    next: any) {

    if (typeof this.Authorizer.HashKey !== 'undefined') {
      if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'SUBJECTS') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        || (procedure === 'spFaleConosco')
        || (procedure === 'spUnidades')
        /*
        || (procedure === 'spSegmentos')
        || (procedure === 'spCarregaGrupos')
        */
      ) {
        const paramsSend = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey, // Por defeito sempre está este valor
          IpHost: sessionStorage.getItem('SessionIP')
        };
        // console.log( JSON.stringify(paramsSend) );
        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsSend).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              /* if (procedure === 'spFaleConosco' || procedure === 'spUnidades') {
                this.alertService.presentToast(resultado.message);
              } */
            } else {
              this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
              this.navCtrl.back();
            }
          } catch (err) {
            this.alertService.presentAlert({
              pTitle: environment.AppNameSigla,
              pSubtitle: this.subtitle,
              pMessage: 'Erro ao fazer a petição'
            });
          }
        });
      } else {
        this.alertService.presentAlert({
          pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
        });
      }
    } else {
      this.goBack();
    }
  }

  private getPermissoesModulo() {
    const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
      return (item.Route === this.router.url);
    });

    if (permissaoModulo.length === 1) {
      this.permissoes = {
        Route: permissaoModulo[0].Route,
        Ver: permissaoModulo[0].Ver,
        Pesquisar: permissaoModulo[0].Pesquisar,
        Inserir: permissaoModulo[0].Inserir,
        Editar: permissaoModulo[0].Editar,
        Deletar: permissaoModulo[0].Deletar
      };
    } else {
      console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
    }
  }

  favoritarItem() {
    let favorite = document.querySelector('.favorite');
    favorite.classList.toggle('active');
  }

}
