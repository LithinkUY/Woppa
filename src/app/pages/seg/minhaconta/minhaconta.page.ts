import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';

import { NavController, Platform, ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

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
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = "Editando a Conta"; // this.Authorizer.formSubTitle; // 'Usuário';
  public subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';


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
  public modelPesquisa: Usuario = new Usuario;


  public collectionEndereco: Endereco[] = [];
  public collectionEnderecoFilter: Endereco[];


  public Cep: any;
  public Telefone: any;
  public Celular: any;
  public CpfCnpj: any;

  public collectionUfs: any = [{
    CodigoBaseUF: 0,
    Nome: '',
    Sigla: ''
  }];
  public collectionUfsFilted: any = [{
    CodigoBaseUF: 0,
    Nome: '',
    Sigla: ''
  }];

  public collectionMunicipios: any = [{
    CodigoBaseUF: 0,
    CodigoBaseMunicipio: 0
  }];
  public collectionMunicipiofilted: any = [{
    CodigoBaseUF: 0,
    CodigoBaseMunicipio: 0
  }];

  public collectionUnidades: any = [{
    CnpjCpf: '',
    CnpjCpfMask: '',
    CodigoUnidade: 0,
    NomeFantasia: '',
    NomeSocial: ''
  }];
  public collectionUnidadefilted: any = [{
    CnpjCpf: '',
    CnpjCpfMask: '',
    CodigoUnidade: 0,
    NomeFantasia: '',
    NomeSocial: ''
  }];



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

  @ViewChild('Senha') iSenha;
  @ViewChild('ReSenha') iReSenha;


  displayCard() {
    return this.Foto !== '';
  }

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    // private popoverController: PopoverController,

    private modalController: ModalController,
    private platform: Platform,
    //public http: HttpClient,
    // public webview: WebView,
    public camera: Camera,

    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.getPermissoesModulo();
    // this.readUFs();      
    this.readCrud();


  }

  /*
  ionViewDidLoad() {
    //console.log(("Passou")
  };
  */


  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.
    // console.log(("ionViewWillEnter");
    // this.CRUDActionAPIForm('Pesquisando', null);

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


  // Ler Munitícios para o campo select Unidade
  readEndereco(pCep: any) {
    this.sendRequest('ExecutarPost', 'spCarregaEndereco', {
      StatusCRUD: '',
      formValues: { Cep: pCep },
    }, (resultado) => {
      if (JSON.parse(atob(resultado.results)).length > 0) {
        this.collectionEndereco = JSON.parse(atob(resultado.results));
        this.collectionEnderecoFilter = this.collectionEndereco;
        this.model.EnderecoRua = this.collectionEnderecoFilter[0].Logradouro;
        this.model.EnderecoNumero = '';
        this.model.Bairro = this.collectionEnderecoFilter[0].Bairro;
        this.model.Cidade = this.collectionEnderecoFilter[0].Cidade;
        this.model.CodigoBaseUF = this.collectionEnderecoFilter[0].CodigoBaseUF;
      } 
      //this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
      //this.model.Municipios = this.collectionMunicipiofilted[0];
    });
  }



  // 03 - Ler / Polula dados de UFs
  //------------------------------------------
  public readUFs() {
    this.sendRequest('ExecutarPost', 'spCarregaUFs', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado) => {
      this.collectionUfs = JSON.parse(atob(resultado.results));
      this.collectionUfsFilted = this.getObjectByValue(this.collectionUfs, "CodigoBaseUF", this.model.CodigoBaseUF);
      this.model.UFs = this.collectionUfsFilted[0];

    });
  }


  // 04 - Ler dados dos do CRUD
  //------------------------------------------
  private readCrud() {
    this.Foto = environment.gifLoadPhoto;
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };

    this.sendRequest('ExecutarPost', 'spMinhaContaUsuario', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;
      this.editCRUD(this.collection[0]);
      // this.readSelectMunicipio(this.collection[0].CodigoBaseMunicipio);
      this.readSelectUnidade(this.collection[0].CodigoUnidade);
      // console.log('readSelectUnidade:',this.collectionUnidades);       

    });
  }

  // 05 - Salvo os dados do form CRUD
  //------------------------------------------  

  salvarCRUD(form: NgForm) {
    // Salvando a informação no banco de dados
    this.model.Senha = Md5.hashStr(this.model.Senha);
    this.model.ReSenha = Md5.hashStr(this.model.ReSenha);
    const params = {
      StatusCRUD: this.model.CodigoUsuario > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };
    this.sendRequest('ExecutarPost', 'spMinhaContaUsuario', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
        this.collectionFilter = this.collection;
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collectionFilter = this.collection.map((item, index) => {
          if (item.CodigoUsuario === this.model.CodigoUsuario) {
            item = JSON.parse(atob(resultado.results))[0];
          }
          return item;
        });
        this.collection = this.collectionFilter;
      }
      
      // this.goBack();     

    });
    this.model.Senha = "";
    this.model.ReSenha = "";

  }


  UploadImage(pFile: any) {
    // Salvando a informação no banco de dados    
    const params = {
      CodigoUsuario: this.model.CodigoUsuario
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

  LoadImage(pFile: any) {
    // Salvando a informação no banco de dados    
    const params = {
      CodigoUsuario: this.model.CodigoUsuario
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


  // 05 - Salvo os dados do form CRUD
  //------------------------------------------
  /* public salvarCRUD(form: NgForm) {
    // Salvando a informação no banco de dados    
    const params = {
      StatusCRUD: this.model.CodigoUsuario > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };
    this.sendRequest('spUsuarios', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
        this.collectionFilter = this.collection;
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collectionFilter = this.collection.map((item, index) => {
          if (item.CodigoUsuario === this.model.CodigoUsuario) {
            item = JSON.parse(atob(resultado.results))[0];
          }
          return item;
        });
        this.collection = this.collectionFilter;
      }
      // this.resetModel();
      // this.flagForm = !(this.flagForm);
      // this.readCrud(1, this.RowsPageDef);
    });

  } */

  // 06 - Edito dados do modelo do formulário CRUD
  //------------------------------------------
  public editCRUD(model: any) {
    this.flagForm = true;


    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }

    this.Foto = environment.gifLoadPhoto;

    this.model.Senha = '';
    this.model.ReSenha = '';

    // Carrega a foto de perfil  
    this.LoadImage(null);

    // Ler Unidade para o campo select Unidade       
    this.sendRequest('ExecutarPost', 'spCarregaUnidades', {
      StatusCRUD: 'READ',
      formValues: { CodigoUndiade: this.model.CodigoUnidade }
    }, (resultado) => {
      this.collectionUnidades = JSON.parse(atob(resultado.results));

      this.collectionUnidadefilted = this.getObjectByValue(this.collectionUnidades, "CodigoUnidade", this.model.CodigoUnidade);
      this.model.Unidades = this.collectionUnidadefilted[0];
    });


    // Ler UFs para o campo select UF
    this.sendRequest('ExecutarPost', 'spCarregaUFs', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado) => {
      this.collectionUfs = JSON.parse(atob(resultado.results));
      this.collectionUfsFilted = this.getObjectByValue(this.collectionUfs, "CodigoBaseUF", this.model.CodigoBaseUF);
      this.model.UFs = this.collectionUfsFilted[0];
    });


    // Ler Munitícios para o campo select Unidade
    this.sendRequest('ExecutarPost', 'spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));

      this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
      this.model.Municipios = this.collectionMunicipiofilted[0];
    });




  }


  // 07 - Deleto as informações do form CRUD
  //------------------------------------------
  public deleteCRUD(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir o usuário: <strong>${model.Nome}</strong>!!!`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          const params = {
            StatusCRUD: 'DELETE',
            formValues: model
          };

          this.sendRequest('ExecutarPost', 'MinhaConta', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoUsuario == this) {
                collection.splice(index, 1);
              }
            }, model.CodigoUsuario);
            this.resetModel();
          });

        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  // 08 - Seleciono o item atual de um SeleceTableComponent
  public selectChange(event: {
    component: IonicSelectableComponent,
    value: any
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
    // console.log('select:', event.value);
  }

  public selectChangeUFs(event: {
    component: IonicSelectableComponent,
    value: any
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
    // console.log('select:', event.value);
    this.model.Municipios = [];
    this.readSelectMunicipio(this.model.CodigoBaseUF);
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
        || (procedure === 'spCarregaEndereco')
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


  /**
   *   
   * Data: 04/12/2019
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  // Envio os dados do CRUD para via API para o banco de dados.
  /*   private sendRequest(
      procedure: string,
      params: { StatusCRUD: string; formValues: any; },
      next: any) {
  
      if (typeof this.Authorizer.HashKey !== 'undefined') {
        if (
          ((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
          || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
          || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
          || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
          || (procedure === 'spCarregaEmpresas')        
          || (procedure === 'spCarregaUFs')
          || (procedure === 'spCarregaMunicipios')
        ) {
  
          const paramsSend = {
            StatusCRUD: params.StatusCRUD,
            formValues: params.formValues,
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
            Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
          }
  
          this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsSend).then(res => {
            const resultado: any = res[0];
            try {
              if (resultado.success) {
                next(resultado);
                if (procedure === 'spMinhaContaUsuario') {
                  this.alertService.showLoader(resultado.message, 1000);
                }
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
  
   */
  // 09 - Pega e retorna um valor de um objeto 
  getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
      return object[key] === value;
    });
  };



  // 10 - formato campos de um formário  
  formatMask(fieldName: any, Value: any, type: any) {
    this.model[fieldName] = this.env.formatMask(Value, type);
    // console.log(value);
  }

  // 11 - Reseto todos os campos de um modelo de dados
  //------------------------------------------------------------ 
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = '';
    }
  }

  // 12 - Filtro Pesquisa Inteligente de um modelo de dados
  //------------------------------------------------------------
  public filterItems(ev: any) {
    // this.CarregaMenuPrincipalStatic();
    this.collectionFilter = this.collection;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.collectionFilter = this.collectionFilter.filter((item) => {
        return (
          (item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.SobreNome.toLowerCase().indexOf(val.toLowerCase()) > -1)
          //  (item.CnpjCpf.toLowerCase().indexOf(val.toLowerCase()) > -1) ||

        );
      });
    }
  }

  // 13 - Sumimento Filtrados 
  //------------------------------------------------------------
  public submitFiltrar(form: NgForm) {
    this.collectionFilter = this.collection;
    const dados = form.value;
    this.collectionFilter = this.env._findWhere(this.collectionFilter, dados)
  }

  public create() {
    this.resetModel();
    this.flagForm = true;
  }

  // 14 - Mostro PopinfoComponent
  //------------------------------------------------------------
  /*   async mostrarPop(ev) {
      const popover = await this.popoverController.create({
        component: PopinfoComponent,
        event: ev,
        translucent: true
      });
      await popover.present();
  
      const { data } = await popover.onWillDismiss();
      if (typeof data !== 'undefined') {
        if (data.item === 'BUSCAR') {
          this.flagFiltroAvanzado = true;
          this.flagForm = false;
          this.collectionFilter = [];
        }
      }
    } */


  public changeUF(value: any) {
    this.model.CodigoBaseUF = value;

  }


  // 14 - Mostro PopinfoComponent
  //------------------------------------------------------------

  public readSelectMunicipio(value: any) {
    this.model.CodigoBaseUF = value;

    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    };

    this.sendRequest('ExecutarPost', 'spCarregaMunicipios', params, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));
    });
  }





  // 14 - Ler Unidade 
  //------------------------------------------------------------

  public readSelectUnidade(value: any) {
    // this.model.CodigoUnidade = value;    

    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoUnidade: this.model.CodigoUnidade }
    };

    this.sendRequest('ExecutarPost', 'spCarregaUnidades', params, (resultado) => {
      this.collectionUnidades = JSON.parse(atob(resultado.results));
    });
  }


  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }




  public toUppercase(e) {
    e.target.value = e.target.value.toUpperCase();
  }

  /*
    loadStoredImages() {
      this.storage.get(STORAGE_KEY).then(images => {
        if (images) {
          let arr = JSON.parse(images);
          this.images = [];
          for (let img of arr) {
            let filePath = this.file.dataDirectory + img;
            let resPath = this.pathForImage(filePath);
            this.images.push({ name: img, path: resPath, filePath: filePath });
          }
        }
      });
    }
   
    pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        let converted = this.webview.convertFileSrc(img);
        return converted;
      }
    }
   
    async presentToast(text) {
      const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }
   
    */

  takePicture(sourceType: any) {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  async selectImage() {
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
  }
  /*
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }
  
      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);
  
      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };
  
      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }
  
  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
  
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
  
      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
  
      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File removed.');
      });
    });
  }
  
  
  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        this.presentToast('Error while reading file.');
      });
  }
  
  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }
  
  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      //   content: 'Uploading image...',
    });
    await loading.present();
  
    this.http.post("http://localhost:8888/upload.php", formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(res => {
        if (res['success']) {
          this.presentToast('Upload de arquivo concluído.')
        } else {
          this.presentToast('Falha no upload do arquivo.')
        }
      });
  }
  */



  /* 
   async Pesquisar(form: NgForm, event: Events) {
     //console.log((form.value);
     //console.log((event);
   
     const modal = await this.modalController.create({
       component: DevicesmodalPage,
       componentProps: form.value
     });
     return await modal.present();
   }
   */

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





  delete(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `<strong>${model.Nome}</strong>!!!`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          const params = {
            StatusCRUD: 'DELETE',
            formValues: model
          };
          this.sendRequest('ExecutarPost', 'spMinhaContaUsuario', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoUsuario === this) {
                collection.splice(index, 1);
              }
            }, model.CodigoContato);
            this.resetModel();
          });
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  read() {
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };

    this.sendRequest('ExecutarPost', 'spMinhaContaUsuario', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;
      this.model = this.collection[0];
      //this.Foto = this.model.VwAvatarPath;
    });
  }


  togglePasswordMode() {
    this.password_type = this.iSenha.type === 'text' ? 'password' : 'text';
    this.password_icon = this.iSenha.type === 'password' ? 'eye' : 'eye-off';

  }


}


