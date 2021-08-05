import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { Unidades } from 'src/app/models/unidades';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment.prod';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.page.html',
  styleUrls: ['./unidades.page.scss'],
})
export class UnidadesPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    public platform: Platform
  ) { }
  private alertCtrl: AlertController;

  public device: string;
  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = "Editando Unidade"; //this.Authorizer.formSubTitle; // 'Usuário';  
  public subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';
  public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;
  public flagFiltroAvanzado: any = false;
  public flagForm: any = false;
  public collection: Unidades[] = [];
  public collectionFilter: Unidades[];
  public model: Unidades = new Unidades;
  public modelPesquisa: Unidades = new Unidades;



  public collectionEmpresa: Empresa[] = [];
  public collectionEmpresaFilted: Empresa[];

  
  public collectionUfs: any = [{
    CodigoBaseUF: 0,
    Nome: '',
    Sigla: ''
  }];
  
  public collectionUnidadeSituacao: any = [{
    CodigoUnidadeSituacao: 0,
    Nome: '',
    Sigla: ''
  }];
  public collectionUnidadeSituacaoFilted: any = [{
    CodigoUnidadeSituacao: 0,
    Nome: '',
    Sigla: ''
  }];

  public collectionUnidadeTipo: any = [{
    CodigoUnidadeTipo: 0,
    Nome: '',
    Sigla: ''
  }];
  public collectionUnidadeTipoFilted: any = [{
    CodigoUnidadeTipo: 0,
    Nome: '',
    Sigla: ''
  }];

  public collectionUfsRgRespOrgExp: any = [{
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



  private permissoes = {
    Route: '',
    Ver: 0,
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado

  private RowsPageDef: any = 4;
  private PageNumber: any = 1;
  private RowsPage: any = 5;
  private RecordCount: number;

  public Paginas: any = [];

  @ViewChild('txtCnpjCpf') txtCnpjCpf;

  private function
  // compareWith = this.compareWithFn;
  ngOnInit() {
    this.getPermissoesModulo();
    this.read(1, this.RowsPageDef);
    this.consultarEmpresas();

    this.consultarUFs();
    this.consultarUnidadeTipo();
    this.consultarUnidadeSituacao();
  }
  
  
  private consultarEmpresas() {
    this.sendRequest('spCarregaEmpresas', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado: any) => {
      this.collectionEmpresa = JSON.parse(atob(resultado.results));
      this.collectionEmpresaFilted = JSON.parse(atob(resultado.results));
    });
  }

  
  private consultarUFs() {
    this.sendRequest('spCarregaUFs', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado: any) => {
      this.collectionUfs = JSON.parse(atob(resultado.results));
      this.collectionUfsRgRespOrgExp = JSON.parse(atob(resultado.results));
    });
  }

  private consultarUnidadeTipo() {
    this.sendRequest('spCarregaUnidadeTipo', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado: any) => {
      this.collectionUnidadeTipo = JSON.parse(atob(resultado.results));
    });
  }

  private consultarUnidadeSituacao() {
    this.sendRequest('spCarregaUnidadeSituacao', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado: any) => {
      this.collectionUnidadeSituacao = JSON.parse(atob(resultado.results));
    });
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
        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        || (procedure === 'spCarregaEmpresas')
        || (procedure === 'spCarregaUnidadeTipo')
        || (procedure === 'spCarregaUnidadeSituacao')
        || (procedure === 'spCarregaUFs')
        || (procedure === 'spCarregaMunicipios')
        /*
        || (procedure === 'spSegmentos')
        || (procedure === 'spCarregaGrupos')
        */
      ) {
        const paramsSend = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
        };
        // console.log( JSON.stringify(paramsSend) );
        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsSend).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              if (procedure === 'spUnidades') {
                this.alertService.presentToast(resultado.message);
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

  salvar(form: NgForm) {
    // Salvando a informação no banco de dados

    const params = {
      StatusCRUD: this.model.CodigoUnidade > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };
    this.sendRequest('spUnidades', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
        this.collectionFilter = this.collection;
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collectionFilter = this.collection.map((item, index) => {
          if (item.CodigoUnidade === this.model.CodigoUnidade) {
            item = JSON.parse(atob(resultado.results))[0];
          }
          return item;
        });
        this.collection = this.collectionFilter;
      }
      //this.resetModel();
      //this.flagForm = !(this.flagForm);
    });
  }

  delete(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `<strong>${model.NomeSocial}</strong>!!!`;
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
          this.sendRequest('spUnidades', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoUnidade === this) {
                collection.splice(index, 1);
              }
            }, model.CodigoUnidade);
            this.resetModel();
          });
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  read(pPageNumber: number, pRowsPage: number) {
    // Obtendo a informação do banco de dados    
    const params = {
      StatusCRUD: 'READ',
      formValues: {
        pageNumber: pPageNumber,
        rowspPage: pRowsPage
      }
    };
    this.sendRequest('spUnidades', params, (resultado) => {
      if (resultado.results !== "W10=") {
        this.collection = JSON.parse(atob(resultado.results));
        this.collectionFilter = this.collection;
        this.RecordCount = this.collectionFilter[0].RecordCount;
        this.showPages(this.PageNumber, this.RowsPage);
      }      
    });
  }

  getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
      return object[key] === value;
    });
  };

  edit(model: any) {
    this.flagForm = true;
    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }

    // this.model.CodigoUnidadeSituacao = this.getObjectByValue(this.collectionUnidadeTipo, "CodigoUnidadeTipo", this.model.CodigoUnidadeSituacao);
    // this.model.CodigoUnidadeTipo = this.getObjectByValue(this.collectionUnidadeSituacao, "CodigoUnidadeSituacao", this.model.CodigoUnidadeSituacao);
    // this.model.CodigoUnidadeTipo = this.getObjectByValue(this.collectionMunicipios, "CodigoUnidadeTipo", this.model.CodigoUnidadeTipo);


    // Ler Munitícios para o campo select Unidade
    this.sendRequest('spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));

      this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
      this.model.Municipios = this.collectionMunicipiofilted[0];
    }); 

    
    this.collectionEmpresaFilted = this.getObjectByValue(this.collectionEmpresaFilted, "CodigoEmpresa", this.model.CodigoEmpresa);
    this.model.Empresa = this.collectionEmpresaFilted[0];

    this.collectionUnidadeTipoFilted = this.getObjectByValue(this.collectionUnidadeTipo, "CodigoUnidadeTipo", this.model.CodigoUnidadeTipo);
    this.model.UnidadeTipo = this.collectionUnidadeTipoFilted[0];


    this.collectionUnidadeSituacaoFilted = this.getObjectByValue(this.collectionUnidadeSituacao, "CodigoUnidadeSituacao", this.model.CodigoUnidadeSituacao);
    this.model.UnidadeSituacao = this.collectionUnidadeSituacaoFilted[0];

  }

  public Select(modelAttr, pField: any) {
    this.model[modelAttr] = pField;
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
  // ? - Mostro PopinfoComponent
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

  /*
  search() {
    // Obtendo a informação do banco de dados
    if (this.modelPesquisa.CnpjCpf
      || this.modelPesquisa.NomeSocial
      || this.modelPesquisa.NomeFantasia
      || this.modelPesquisa.IE
    ) {
      const params = {
        StatusCRUD: 'QUERY',
        formValues: {
          NomeSocial: this.modelPesquisa.NomeSocial,
          NomeFantasia: this.modelPesquisa.NomeFantasia,
          CnpjCpf: this.modelPesquisa.CnpjCpf,
          IE: this.modelPesquisa.IE,
          pageNumber: 1,
          rowspPage: 4
        }
      };
      this.sendRequest('spUnidades', params, (resultado) => {
        this.collection = JSON.parse(atob(resultado.results));
        this.collectionFilter = this.collection;
        this.RecordCount = this.collectionFilter[0].RecordCount;
        this.showPages(this.PageNumber, this.RowsPage);
      });
    } else {
      this.txtCnpjCpf.setFocus();
    }
  }
  */


  goBack() {
    if (this.flagForm) {
      // Se o formulario está ativo, então altera a flagForm para que mostre a lista
      this.flagForm = false;
    } else if (this.flagFiltroAvanzado) {
      // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
      this.flagFiltroAvanzado = false;
      this.collectionFilter = this.collection;
    } else {
      this.navCtrl.back();

    }
  }

  FormClose() {
    this.flagForm = false;
  }


  formatMask(fieldName: any, Value: any, type: any) {
    this.model[fieldName] = this.env.formatMask(Value, type);
    // console.log(value);
  }

  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = '';
    }
  }

  public getItems(ev: any) {
    // this.CarregaMenuPrincipalStatic();
    this.collectionFilter = this.collection;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.collectionFilter = this.collectionFilter.filter((item) => {
        return (
          (item.NomeSocial.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.NomeFantasia.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.CnpjCpf.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.CpfRespEmpresa.toLowerCase().indexOf(val.toLowerCase()) > -1)
        );
      });
    }
  }

  public submitFiltrar(form: NgForm) {
    this.collectionFilter = this.collection;
    const dados = form.value;
    this.collectionFilter = this.env._findWhere(this.collectionFilter, dados)
  }

  public create() {
    this.resetModel();
    this.flagForm = true;
  }

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

  public carregarSelectMunicipio(value: any) {
    this.model.CodigoBaseUF = value;
    // this.model.CodigoMunicipio = 0;

    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    };

    this.sendRequest('spCarregaMunicipios', params, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));
    });
  }

  selectChange(event: {
    component: IonicSelectableComponent,
    value: any
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
    // console.log('select:', event.value);
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






