import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';

// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
// for install: https://www.npmjs.com/package/ts-md5
import { Md5 } from 'ts-md5/dist/md5';
// Secure Storage
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
// import { Network } from '@ionic-native/network';


// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
// import { GooglePlus, GooglePlusOriginal } from '@ionic-native/google-plus';
// import { TwitterConnect } from '@ionic-native/twitter-connect';

// import { GooglePlusOriginal } from '@ionic-native/google-plus';

import { environment } from './../../../environments/environment.prod';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  @ViewChild('txtEmail') iEmail;
  @ViewChild('Senha') iSenha;

/*   showBtn: boolean = false;
  defPrompt; */

  public model: Usuario = new Usuario;
  // @ViewChild('txtCpfCnpjEmpresa') iCpfCnpjEmpresa;  
  public CodigoUsuarioSistema: string;
  public NomeUsuarioSistema: string;
  public Email: string;
  public Senha: string;
  public CpfCnpjEmpresa: any;

  public isLogin: boolean = true;
  public storage: any;


  public AppName: string = environment.AppName;
  public logoCliente: string = environment.logoCliente;
  public AppLogoApp: string = environment.logoApp;
  public login__image: string = environment.login__image;
  
  public appVersion: string = environment.AppVersion;

  public password_type: string = 'password';
  public password_icon: string = 'eye-off';

  constructor(
    private platform: Platform,
    // , private modalController: ModalController
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    // ,private facebook : Facebook 
    // ,private googlePlus : GooglePlus
    // ,googlePlus: GooglePlusOriginal
    private db: Storage,
    // ,private secureStorage: SecureStorage
  ) {


    //this.isLogin = true;
    // LSU -> LAST SESSION USER
    /*
    this.db.get('LSU').then((LSU) => {
      let SU = JSON.parse(atob(LSU));
      this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
      this.NomeUsuarioSistema = SU[0].Nome;
      ////console.log(('Olá, ' + SU[0].Nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');      
    });
    */

  }


  async ngOnInit() {
    await this.Authorizer.ConectionInet();
    this.db.clear()
  }

  /* ionViewWillEnter() {

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.defPrompt = e;
      this.showBtn = true;
    });
            
    window.addEventListener('appinstalled', (event) => {
     alert('instalado');
    });
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //// console.log(("ionViewWillEnter");    
  }
 */
/*   add_to_home(){

    //Mostra o prompt
    this.defPrompt.prompt();
    // Espera o usuario responder o prompt
    this.defPrompt.choiceResult
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          alert('Usuario aceitou instalar');
        } else {
          alert('Usuario rejeitou instalar');
        }
        this.defPrompt = null;
      });
  };
  */


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    // //console.log(("ionViewDidEnter");         
    this.iEmail.setFocus();
  }

  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.    
    //// console.log(("ionViewWillLeave"); 

  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //// console.log(("ionViewDidLeave");

  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      // console.log( ('exit');
      navigator['app'].exitApp();
    });
  }

  togglePasswordMode() {
    this.password_type = this.iSenha.type === 'text' ? 'password' : 'text';
    this.password_icon = this.iSenha.type === 'password' ? 'eye' : 'eye-off';     
    
  }


  async AuthLogin(form: NgForm) {
    this.isLogin = false;
    form.value.Senha = Md5.hashStr(this.model.Senha);
    this.Authorizer.CpfCnpjEmpresa = form.value.CpfCnpjEmpresa;
    
    const loginResult: any = await this.Authorizer.iLogin(form);
    
    if (loginResult[0].Sucess === true) {
      this.isLogin = true;
      const Nome = JSON.parse(atob(loginResult[0].Results))[0].Nome;
      const SobreNome = JSON.parse(atob(loginResult[0].Results))[0].SobreNome;
      this.Authorizer.NomeUsuarioSistema = Nome + ' ' + SobreNome;
      // this.alertService.showLoader(loginResult[0].Message, 2000);

      this.navCtrl.navigateRoot('/');
    } else {
      this.model.Senha = '';
      this.alertService.presentAlert({
        pTitle: 'Controle de Acesso',
        pSubtitle: 'Olá, Todo mundo erra.',
        pMessage: loginResult[0].Message
      });
      this.iEmail.setFocus();
      this.isLogin = true;
    }
  }

  formatMask(fieldName: any, Value: any, type: any) {
    this.model[fieldName] = this.env.formatMask(Value, type);
    // console.log(value);
  }
 
  
};


