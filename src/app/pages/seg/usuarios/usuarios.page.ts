// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NavController, AlertController, PopoverController, ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment.prod';

import { IonicSelectableComponent } from 'ionic-selectable';

// import { Unidades } from 'src/app/models/unidades';
import { NG_FORM_SELECTOR_WARNING } from '@angular/forms/src/directives';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import fixOrientation from 'fix-orientation';
import { Endereco } from 'src/app/models/enderecos';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {



  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = "Editando "+this.Authorizer.formSubTitle; // this.Authorizer.formSubTitle; // 'Usuário';
  public subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';


  public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;
  public flagFiltroAvanzado: any = false;
  public flagForm: any = false;
  public collection: Usuario[] = [];
  public collectionFilter: Usuario[];
  public model: Usuario = new Usuario;
  public modelPesquisa: Usuario = new Usuario;



  @ViewChild('Nome') iNome;
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('imgresult') imgResult: ElementRef;




  public collectionOrgaoUfs: any = [{
    CodigoBaseUF: 0,
    Nome: '',
    Sigla: ''
  }];
  public collectionOrgaoUfsFilted: any = [{
    CodigoBaseUF: 0,
    Nome: '',
    Sigla: ''
  }];

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


  public collectionEndereco: Endereco[] = [];
  public collectionEnderecoFilter: Endereco[];

  private permissoes = {
    Route: '',
    Ver: 0,
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado


  // public collectionUnidade: Unidades[] = [];
  // public collectionUnidadeFilted: Unidades[];
  // public modelUnidade: Unidades = new Unidades;

E
  private RowsPageDef: any = 4;
  private PageNumber: any = 1;
  private RowsPage: any = 5;
  private RecordCount: number;

  public device: string;
  public SrcPhotoAvatar: any = environment.iconAvatarUsuarioDefault;
  public Foto: any = environment.iconAvatarUsuarioDefault;




  public Paginas: any = [];

  @ViewChild('txtCpfCnpj') txtCpfCnpj;

  @ViewChild('txtNome') txtNome;

  private function

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    private actionSheetController: ActionSheetController,
    public camera: Camera,
    private ref: ChangeDetectorRef
  ) {


  }

  // 93868480 - Matrícula

  // 01 - Carrega o formuário CRUD
  //------------------------------------------
  ngOnInit() {
    this.getPermissoesModulo();    
    this.read(1, this.RowsPageDef);
  }


// Ler Munitícios para o campo select Unidade
readEndereco(pCep: any) {
  this.sendRequest('spCarregaEndereco', {
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
      this.model.CodigoBaseMunicipio = this.collectionEnderecoFilter[0].CodigoBaseMunicipio;
      
    }
    //this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
    //this.model.Municipios = this.collectionMunicipiofilted[0];
  });
}



  // 02 - Vola ao módulo anterior 
  //------------------------------------------
  public goBack() {
    if (this.flagForm) {
      // Se o formulario está ativo, então altera a flagForm para que mostre a lista
      this.flagForm = false;
      this.resetModel();
    } else if (this.flagFiltroAvanzado) {
      // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
      this.flagFiltroAvanzado = false;
      this.collectionFilter = this.collection;
    } else {
      this.navCtrl.back();
    }
    this.title =  this.Authorizer.formTitle;
  }

  // 02 - Pego as Permissões deste Módulo
  //------------------------------------------
  private getPermissoesModulo() {
    const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
      return (item.Route === this.router.url)
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
      // console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
    }
  }

  // 03 - Ler / Polula dados de UFs
  //------------------------------------------
  public CarregaUfs() {
    this.sendRequest('spCarregaUFs', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado) => {
      this.collectionUfs = JSON.parse(atob(resultado.results));
    });
  }

  private CarregaUnidades() {
    this.sendRequest('spCarregaUnidades', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado: any) => {
      this.collectionUnidades = JSON.parse(atob(resultado.results));      
    });
  }


  // 04 - Ler dados dos do CRUD
  //------------------------------------------
  
  read(pPageNumber: number, pRowsPage: number) {
    // Obtendo a informação do banco de dados    
    this.subtitle = "Usuários";
    const params = {
      StatusCRUD: 'READ',
      formValues: {
        pageNumber: pPageNumber,
        rowspPage: pRowsPage
      }
    };   
   
    this.sendRequest('spUsuarios', params, (resultado) => {
      if (resultado.results !== "W10=") {
        this.collection = JSON.parse(atob(resultado.results));
        this.collectionFilter = this.collection;
        //this.RecordCount = this.collectionFilter[0].RecordCount;        
      }    

    });
    this.CarregaUnidades();    
    this.CarregaUfs();
  }

  public selectChangeUFs(event: {
    component: IonicSelectableComponent,
    value: any,
    readMunicipios: boolean
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
   
    // Ler Munitícios para o campo select Unidade
    this.sendRequest('spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));
    });
   
  }



  // 05 - Salvo os dados do form CRUD
  //------------------------------------------
  public salvar(form: NgForm) {
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
      //PWDadmin2020
      //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
    });

  }

  // 06 - Edito dados do modelo do formulário CRUD
  //------------------------------------------
  public edit(model: any) {    
    this.flagForm = true;
    this.Foto = environment.gifLoadPhoto;
    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }

    // Carrega a foto de perfil  
    this.LoadImage(null);


    // Ler Munitícios para o campo select Unidade
    this.sendRequest('spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));

      this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
      this.model.Municipios = this.collectionMunicipiofilted[0];
    });


    this.collectionUnidadefilted = this.getObjectByValue(this.collectionUnidades, "CodigoUnidade", this.model.CodigoUnidade);
    this.model.Unidades = this.collectionUnidadefilted[0];

    //this.collectionOrgaoUfsFilted = this.getObjectByValue(this.collectionUfs, "CodigoBaseUF", this.model.RgRespOrgaoUFCodigoBaseUF);
    //this.model.OrgaoUFs = this.collectionOrgaoUfsFilted[0]; 


    this.collectionUfsFilted = this.getObjectByValue(this.collectionUfs, "CodigoBaseUF", this.model.CodigoBaseUF);
    this.model.UFs = this.collectionUfsFilted[0]; 


  }


  // 07 - Deleto as informações do form CRUD
  //------------------------------------------
  public delete(model: any) {
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

          this.sendRequest('spUsuarios', params, (resultado) => {
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
  private selectChange(event: {
    component: IonicSelectableComponent,
    value: any
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
    // console.log('select:', event.value);
  }


  /**
   *   
   * Data: 04/12/2019
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  // Envio os dados do CRUD para via API para o banco de dados.
  private sendRequest(
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
        || (procedure === 'spCarregaUnidades')
        || (procedure === 'spCarregaEndereco') 

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
              if (procedure === 'spUsuarios') {
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


  ionViewDidEnter() {


    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log(("ionViewDidEnter");
    // if (this.flagForm) {

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
      //}
    };




  }

  takePictureOnchange() {
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
    }
  }


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

  LoadImage(pCodigoUsuarioSistema: any) {
    // Salvando a informação no banco de dados    
    const params = {
        CodigoUsuario: this.model.CodigoUsuario
      , CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema // Por defeito sempre está este valor
      , Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor                          
    };
    this.Authorizer.QueryStoreProcUpLoad('LoadImage', 'spLoadFotoMinhaConta', params, null).then(res => {
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
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
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
  async mostrarPop(ev) {
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
  }

  // 14 - Mostro PopinfoComponent
  //------------------------------------------------------------

  public readSelectMunicipio(value: any) {
    this.model.CodigoBaseUF = value;

    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    };

    this.sendRequest('spCarregaMunicipios', params, (resultado) => {
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

    this.sendRequest('spCarregaUnidades', params, (resultado) => {
      this.collectionUnidades = JSON.parse(atob(resultado.results));
    });
  }


  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }



  public compareWithFn = (o1, o2) => {
    return o1 === o2;
  }


  showPages(pPageNumber: number, pRowsPage: number) {
    this.Paginas = [];
    for (let i = pPageNumber; i < pRowsPage; i++) {
      this.Paginas.push({
        PageNumber: i
      });
    }
  }


  // 15 - Seleciona a Paginação do formuária CRUD 
  //------------------------------------------------------------

  public selecionaPagina(numero: number) {
    if (numero < 100) {
      if ((numero + this.RowsPageDef) < this.RecordCount) {
        if ((numero > 0) || (this.PageNumber > 1)) {
          this.PageNumber = numero - 1;
        }
        if (this.RecordCount > numero + this.RowsPageDef) {
          this.PageNumber = numero;
          this.RowsPage = numero + this.RowsPageDef;
        }
      } else {
        this.PageNumber = 1;
        this.RowsPage = (this.RowsPageDef + 1);
      }
    } else if (numero === 1000) {
      this.PageNumber = 1;
      this.RowsPage = (this.RowsPageDef + 1);
    } else if (numero === 1001) {
      if (this.PageNumber <= (this.RowsPageDef + 1)) {
        this.PageNumber = 1;
        this.RowsPage = (this.RowsPageDef + 1);
      } else {
        this.PageNumber = this.PageNumber - this.RowsPageDef;
        this.RowsPage = this.PageNumber + this.RowsPageDef;
      }
    } else if (numero === 1002) {
      if (this.PageNumber + this.RowsPageDef >= this.RecordCount) {
        this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
        this.RowsPage = this.RecordCount + 1;
      } else {
        this.PageNumber = this.PageNumber + this.RowsPageDef;
        this.RowsPage = this.RowsPage + this.RowsPageDef;
      }
    } else if (numero === 1003) {
      this.RowsPage = this.RecordCount + 1;
      this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
    }
    this.read(this.PageNumber, this.RowsPageDef);
    // console.log('Número:' + numero + ', Página:' + this.PageNumber + ', Linha:' + this.RowsPage)
  }






}

