
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NavController, Platform, ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

/*
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
*/


import { Md5 } from 'ts-md5/dist/md5';

// import { WebView } from '@ionic-native/ionic-webview/ngx';

import { Camera } from '@ionic-native/camera/ngx';


// import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import fixOrientation from 'fix-orientation';


import { Usuario } from 'src/app/models/usuario';

import { IonicSelectableComponent } from 'ionic-selectable';
import { Endereco } from 'src/app/models/enderecos';

@Component({
  selector: 'app-identidade-digital',
  templateUrl: './identidade-digital.page.html',
  styleUrls: ['./identidade-digital.page.scss'],
})
export class IdentidadeDigitalPage implements OnInit {

  public encodeData: any;
  public scannedData: {};
  //public barcodeScannerOptions: BarcodeScannerOptions;


  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = this.Authorizer.formSubTitle; // 'Usuário';
  public subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';
  public logoCliente: string = environment.logoCliente;
  


  images = [];
  imageData = [];

  public password_type: string = 'password';
  public password_icon: string = 'eye-off';

  /*
  public collection: MinhaConta[] = [];
  public collectionFilter: MinhaConta[];
  public model: MinhaConta = new MinhaConta;
  */

  public flagForm: any = false;
  public collection: Usuario[] = [];
  public collectionFilter: Usuario[];
  public model: Usuario = new Usuario;



  private permissoes = {
    Route: '',
    Ver: 0,
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado

  public device: string;
  public SrcPhotoAvatar: any = environment.iconAvatarUsuarioDefault;
  public Foto: any;

  // public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;

  @ViewChild('Nome') iNome;
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('imgresult') imgResult: ElementRef;

  
  displayCard() {
    return this.Foto !== '';
  }

  public qrData = 'Dados';
  public createdCode = null;
  public scannedCode = null;
  public encodedData = null;

  public myAngularxQrCode: any;



  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private platform: Platform,    
    public camera: Camera,
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
  ) {

    
  }



  ngOnInit() {
    this.getPermissoesModulo();
    this.read();
  }


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidEnter");

    const imgResult = this.imgResult.nativeElement as HTMLInputElement;
    imgResult.src = this.SrcPhotoAvatar;

    // MY BIT
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.onchange = () => {

      // Depois colocar um loading aqui!!!

      const reader = new FileReader();

      reader.onload = (r: any) => {

        // THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        // THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        // UP TO YOU, NOT REALLY BOTHERED
        const base64 = r.target.result as string;

        // FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
          // fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
          this.Foto = fixed;
          this.UploadImage(this.Foto);
          // this.model.Foto = base64;
          // this.alertService.hideLoader(500);
        });

      };

      reader.readAsDataURL(element.files[0]);
    };




  }

  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.

  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidLeave");
  }
  goBack() {
    this.navCtrl.back();
  }

  // 01 - Ler dados dos do CRUD
  //------------------------------------------
  private read() {
    this.Foto = environment.gifLoadPhoto;
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };

    this.sendRequest('ExecutarPost', 'spMinhaContaUsuario', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;

      // Populo Model de Usuários
      this.model = this.collection[0];
      for (const key in this.model) {
          this.model[key] = this.model[key];
      }

      this.qrData = this.model.CpfCnpj;
      // Carrego a Foto do Usuário      
      this.LoadImage(null);

    });
  }

  // 02 - Salvando a informação no banco de dados   
  //---------------------------------------------
  UploadImage(pFile: any) {    
    const params = {
      CodigoUsuario: this.Authorizer.CodigoUsuarioSistema
      , CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema // Por defeito sempre está este valor
      , Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor                                       
    };
    this.Authorizer.QueryStoreProcUpLoad('UploadImage', 'spUploadFotoMinhaConta', params, pFile).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          this.alertService.showLoader(resultado.message, 2000);
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
        }
      } catch (err) {
        this.alertService.presentAlert({
          pTitle: environment.AppNameSigla,
          pSubtitle: this.subtitle,
          pMessage: 'Erro ao fazer a petição'
        });
      }
    });
  }

  // 02 - Salvando a informação no banco de dados   
  //---------------------------------------------  
  LoadImage(pFile: any) {
    
    const params = {
      CodigoUsuario: this.Authorizer.CodigoUsuarioSistema
      , CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema // Por defeito sempre está este valor
      , Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor                                       
    };
    this.Authorizer.QueryStoreProcUpLoad('LoadImage', 'spLoadFotoMinhaConta', params, pFile).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          // this.alertService.showLoader(resultado.message, 1000);              
          const base64Image = "data:image/jpeg;base64," + resultado.imagebase64;

          fixOrientation(base64Image, { image: true }, (fixed: string, image: any) => {
            // fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
            this.Foto = fixed;
            this.title = this.subtitle;
          });
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
        }
      } catch (err) {
        this.alertService.presentAlert({
          pTitle: environment.AppNameSigla,
          pSubtitle: this.subtitle,
          pMessage: 'Erro ao fazer a petição'
        });

      }
    });
  }
  /**
     *   
     * Data: 04/12/2019
     * @param metodo Nome do metodo que vai executar na API
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
  private sendRequest(
    metodo: string,
    procedure: string,
    params: { StatusCRUD: string; formValues: any },
    next: any) {

    if (typeof this.Authorizer.HashKey !== 'undefined') {
      if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        || (procedure === 'spMinhaContaUsuario')
        || (procedure === 'spCarregaEmpresas')
        || (procedure === 'spCarregaUFs')
        || (procedure === 'spCarregaMunicipios')
      ) {
        const paramsSend = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
        };
        this.Authorizer.QueryStoreProc(metodo, procedure, paramsSend).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              // this.alertService.presentToast('Processando...');
              if (((procedure === 'spMinhaContaUsuario' && params.StatusCRUD === 'UPDATE'))
              ) {
                this.alertService.showLoader(resultado.message, 3000);

                // this.navCtrl.back();
              }
            } else {
              this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
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



  // 10 - formato campos de um formário  
  formatMask(fieldName: any, Value: any, type: any) {
    this.model[fieldName] = this.env.formatMask(Value, type);
    // console.log(value);
  }

  

  takePicture(sourceType: any) {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  async selectImage() {
    /*
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecionar fonte da imagem',
      buttons: [{
        text: 'Carregar da biblioteca de Imagens',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use a Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Desistir',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
    */
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


  isPortrait() {
    this.device = this.platform.platforms()[0];
    // this.alertService.presentToast(this.platform.platforms()[0]);
    if (this.platform.platforms()[0] === "android" ||
      // this.platform.platforms()[0] === "ipad" ||
      this.platform.platforms()[0] === "iphone") {
      if (this.flagForm) {
        // return (window.innerHeight > window.innerWidth);  
        if (!this.platform.isPortrait()) {
          // this.toggleFullscreen(event);

        }
        return this.platform.isPortrait();
      }
    } else {
      return true;
    }
  }



  /* scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert("Barcode data " + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
    })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }
 */
  /*
  createCode () {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }
  
  scanCode () {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }
  */




}


