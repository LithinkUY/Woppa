import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Menus } from 'src/app/models/menus';

@Component({
  selector: 'app-menusadm',
  templateUrl: './menusadm.page.html',
  styleUrls: ['./menusadm.page.scss'],
})
export class MenusadmPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router
  ) { }
  private alertCtrl: AlertController;

  public AppName: string = environment.AppNameSigla;
  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = this.Authorizer.formSubTitle; // 'Usuário';
  public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;
  public flagFiltroAvanzado: any = false;


  private RowsPageDef: any = 100;
  private PageNumber: any = 1;
  private RowsPage: any = 5;
  private RecordCount: number;

  public Paginas: any = [];

  public flagForm: any = false;
  public collection: Menus[] = [];
  public collectionFilter: Menus[];
  public model: Menus = new Menus;
  public modelPesquisa: Menus = new Menus;
  public collectionSegmentos: any = [{
    CodigoSegmento: '',
    Nome: ''
  }];
  public collectionGrupos: any = [{
    CodigoGrupo: '',
    CodigoSegmento: '',
    Grupo: ''
  }];
  public collectionMenuGrupos: any = [{
    CodigoBaseUF: 0,
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
  private permissoes = {
    Route: '',
    Ver: 0,
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado

  @ViewChild('txtRamal') txtRamal;
  @ViewChild('txtNomeMorador') txtNomeMorador;


  private function
  // compareWith = this.compareWithFn;
  ngOnInit() {
    this.getPermissoesModulo();
    this.read(1, this.RowsPageDef);
    this.CarregaMenuGrupos();
    
  }
  private CarregaMenuGrupos() {
    this.sendRequest('spMenuGrupos', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado) => {
      this.collectionMenuGrupos = JSON.parse(atob(resultado.results));
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
  private async sendRequest(
    procedure: string,
    params: { StatusCRUD: string; formValues: any; },
    next: any) {

    if (typeof this.Authorizer.HashKey !== 'undefined') {
      if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        || ((params.StatusCRUD === 'QUERY') && (this.permissoes.Pesquisar > 0))
        || (procedure === 'spMenuGrupos')
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
        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsSend).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              if (procedure === 'spMenusAdm') {
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

  search() {
    // Obtendo a informação do banco de dados
    if (this.txtNomeMorador.value || this.txtRamal.value) {
      const params = {
        StatusCRUD: 'QUERY',
        formValues: {
          NomeMorador: this.txtNomeMorador.value,
          Ramal: this.txtRamal.value,
          pageNumber: 1,
          rowspPage: 4
        }
      };
      this.sendRequest('spMenusAdm', params, (resultado) => {
        this.collection = JSON.parse(atob(resultado.results));
        this.collectionFilter = this.collection;
        this.RecordCount = this.collectionFilter[0].RecordCount;
        this.showPages(this.PageNumber, this.RowsPage);
      });
    } else {
      this.txtRamal.setFocus();
    }
  }

  async salvar(form: NgForm) {
    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: this.model.CodigoMenuSistema > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };
    this.sendRequest('spMenusAdm', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
        this.collectionFilter = this.collection;
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collectionFilter = this.collection.map((item, index) => {
          if (item.CodigoMenuSistema === this.model.CodigoMenuSistema) {
            item = JSON.parse(atob(resultado.results))[0];
          }
          return item;
        });
        this.collection = this.collectionFilter;
      }
      this.resetModel();
      this.flagForm = !(this.flagForm);
    });
  }

  delete(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `<strong> ${model.Name}</strong>!!!`;
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
          this.sendRequest('spMenusAdm', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoMenuSistema === this) {
                collection.splice(index, 1);
              }
            }, model.CodigoMorador);
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

    this.sendRequest('spMenusAdm', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;
      this.RecordCount = this.collectionFilter[0].RecordCount;
      this.showPages(this.PageNumber, this.RowsPage);
      // this.modelPesquisa.Pagina = this.paginas[0];
    });


  }

  edit(model: any) {
    this.flagForm = true;
    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }
    // Grupos
    /*
    this.sendRequest('spCarregaGrupos', {
      StatusCRUD: 'READ',
      formValues: { CodigoSegmento: this.model.CodigoSegmento }
    }, (resultado) => {
      this.collectionGrupos = JSON.parse(atob(resultado.results));
    });
    */
    // Municipios
    /*
    this.sendRequest('spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));
    });
    */
  }

  goBack() {
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
          (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          // (item.MenuGrupo.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.Details.toLowerCase().indexOf(val.toLowerCase()) > -1)
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

  public carregarSelectGrupo(option) {
    // this.model.CodigoSegmento = option.target.value;
    // this.model.CodigoGrupo = 0;

    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoSegmento: option.target.value }
    };

    this.sendRequest('spCarregaGrupos', params, (resultado) => {
      this.collectionGrupos = JSON.parse(atob(resultado.results));
    });
  }

  /*
  public carregarSelectMunicipio( value: any) {
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
  */

  /*
  private CallPhone( PhoneNumber: string) {
 
   this.callNumber.callNumber(PhoneNumber, true).then(
     res => console.log('Launched dialer!', res))
   .catch(
     err => console.log('Error launching dialer', err));
  }
  */

  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }

  public compareWithFn = (o1, o2) => {
    return o1 === o2;
  }


  /*
  public showPagination() {
    let tot: number;
    let pag: number;
    tot = this.collection[0].total;

    pag = tot / this.modelPesquisa.RowspPage;
    if (pag < 1) {
      pag = 1;
    }

    for (let i = 0; i < pag; i++) {
      let num: number;
      num = i + 1;

      if (i === 0) {
        this.paginas  = [
          {
            numero : num,
            nome: 'Página ' + num.toString()
          }
        ];
      } else {
        this.paginas.push( {
          numero : num,
          nome: 'Página ' + num.toString()
        });
      }
    }
    this.modelPesquisa.Pagina = this.paginas[0];
  }
  */
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
      if (  (numero + this.RowsPageDef) < this.RecordCount ) {
        if ( (numero > 0) || (this.PageNumber > 1) ) {
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
      if ( this.PageNumber <= (this.RowsPageDef + 1) ) {
        this.PageNumber = 1;
        this.RowsPage = (this.RowsPageDef + 1);
      } else {
        this.PageNumber = this.PageNumber - this.RowsPageDef;
        this.RowsPage  = this.PageNumber + this.RowsPageDef;
      }
    } else if (numero === 1002) {
      if ( this.PageNumber + this.RowsPageDef >= this.RecordCount ) {
        this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
        this.RowsPage = this.RecordCount + 1;
      } else {
        this.PageNumber = this.PageNumber + this.RowsPageDef;
        this.RowsPage  = this.RowsPage + this.RowsPageDef;
      }
    } else if (numero === 1003) {
        this.RowsPage = this.RecordCount + 1;
        this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
    }
    this.read(this.PageNumber, this.RowsPageDef);
    // console.log('Número:' + numero + ', Página:' + this.PageNumber + ', Linha:' + this.RowsPage)
  }

}


