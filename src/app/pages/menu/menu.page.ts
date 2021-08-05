import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
// import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { environment } from '../../../environments/environment.prod';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})

export class MenuPage implements OnInit {

  public showBtn: boolean = false;
  public defPrompt;

  public CodigoUsuarioSuporte: any;
  public NomeUsuarioSistema: any;
  public Matricula: string;
  public CpfCnpjEmpresa: string;
  public NumeroTerminal: any = sessionStorage.getItem('SessionIP');


  public AppName: string = environment.AppName;
  public AppVersion: string = environment.AppVersion;
  public AppLogoApp: string = environment.logoApp;
  public AppEmailSuporte = environment.AppEmailSuporte;
  public AppWhatAppSuporte = environment.AppWhatAppSuporte;
  public logoCliente: string = environment.logoCliente;
  public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;

  private selectedPath = '';
  public SideMenu = [];
  constructor(
    public plt: Platform,
    // private document: DocumentViewer,
    private db: Storage,
    private Authorizer: AuthService,
    private alertService: AlertService,
    // private principalPage : PrincipalPage,
    public navCtrl: NavController,
    private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
      /*
      plt.ready().then((source) => {
        //console.log(("platform: " + source);
      });
      */
    });
  }

  itemSelected(item: any) {
    // this.alertService.showLoader("Acessando...: " + item.Name,1000);
    this.Authorizer.CodigoMenuPai = item.CodigoMenuPai;
    this.Authorizer.CodigoMenuGrupoL = item.CodigoMenuGrupo;
    this.Authorizer.formTitle = item.Name;
    this.Authorizer.formSubTitle = item.Details;
    this.navCtrl.navigateRoot(item.Route);
    // console.log('Módulo Selecionado:',item);


  }

  pwaInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.defPrompt = e;
      this.showBtn = true;
    });

    window.addEventListener('appinstalled', (event) => {
      console.log('PWA Instalado');
    });
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //// console.log(("ionViewWillEnter");    
  }


  add_to_home() {

    //Mostra o prompt
    this.defPrompt.prompt();
    // Espera o usuario responder o prompt
    this.defPrompt.choiceResult
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceitou instalar');
        } else {
          console.log('Usuario rejeitou instalar');
        }
        this.defPrompt = null;
      });
  };


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidEnter");
    if (this.Authorizer.HashKey) {
      this.CpfCnpjEmpresa = this.Authorizer.CpfCnpjEmpresa;
      this.CodigoUsuarioSuporte = this.Authorizer.CodigoUsuarioSuporte;
      this.CarragaMenuLateralAPI();

      
      /*
      this.db.get('LSU').then((LSU) => {
        let SU = JSON.parse(atob(LSU));
        this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
        this.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
        this.NomeUsuarioSistema = SU[0].Nome;
      });
      */
    } else {
      // this.navCtrl.navigateRoot('/login');
    }
  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidLeave");    

  }

  CarragaMenuLateralAPI() {
    // paramStatus: Pesquisando, Editando, Deletando
    const params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      CodigoMenuGrupo: this.Authorizer.CodigoMenuGrupoL,
      CodigoMenuPai: this.Authorizer.CodigoMenuPai,
      Hashkey: this.Authorizer.HashKey
    };
    this.Authorizer.QueryStoreProc('ExecutarPost', 'spCarregaMenuLateral', params).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          // this.alertService.showLoader(resultado.message,1000);
          this.SideMenu = JSON.parse(atob(resultado.results));
          this.NomeUsuarioSistema = this.Authorizer.NomeUsuarioSistema;
          this.Matricula = this.Authorizer.Matricula;

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

  ngOnInit() {    
    this.pwaInstall();
  }
  /*
  onCopy(text) {
    this.clipboard.copy(text);
  }
  */

}
