import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Contatos } from 'src/app/models/contatos';

import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {

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
  public subtitle = "Editando Contato"; // this.Authorizer.formSubTitle; // 'Usuário';
  public subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';
  public iconAvatarUsuario: string = environment.iconAvatarUsuarioDefault;
  public flagFiltroAvanzado: any = false;
  public flagForm: any = false;  

  public collection: Contatos[] = [];
  public collectionFilter: Contatos[];
  public model: Contatos = new Contatos;
  public modelPesquisa: Contatos = new Contatos;
  public collectionSegmentos: any = [{
    CodigoSegmento: '',
    Nome: ''
  }];
  public collectionGrupos: any = [{
    CodigoGrupo: '',
    CodigoSegmento: '',
    Grupo: ''
  }];
  public collectionUfs: any = [{
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

  @ViewChild('txtNome') txtNome;

  private function
  // compareWith = this.compareWithFn;
  ngOnInit() {
    this.getPermissoesModulo();
    this.read();
    // Segmentos
    // this.consultarSegmentos();
    // Uf
    this.consultarUFs();
  }
  private consultarUFs() {
    this.sendRequest('spCarregaUFs', {
      StatusCRUD: '',
      formValues: ''
    }, (resultado) => {
      this.collectionUfs = JSON.parse(atob(resultado.results));
      this.collectionUfsRgRespOrgExp = JSON.parse(atob(resultado.results));
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
        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsSend).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              if (procedure === 'spContatos') {
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
      StatusCRUD: this.model.CodigoContato > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };
    this.sendRequest('spContatos', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
        this.collectionFilter = this.collection;
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collectionFilter = this.collection.map((item, index) => {
          if (item.CodigoContato === this.model.CodigoContato) {
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
          this.sendRequest('spContatos', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoContato === this) {
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

    this.sendRequest('spContatos', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;
    });
  }
  
  getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
      return object[key] === value;
    });
  };


  selectChange(event: {
    component: IonicSelectableComponent,
    value: any
  }, modelAttr) {
    this.model[modelAttr] = event.value[modelAttr]
    // console.log('select:', event.value);
  }

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
   
    // Ler Munitícios para o campo select Unidade
    this.sendRequest('spCarregaMunicipios', {
      StatusCRUD: 'READ',
      formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
    }, (resultado) => {
      this.collectionMunicipios = JSON.parse(atob(resultado.results));

      this.collectionMunicipiofilted = this.getObjectByValue(this.collectionMunicipios, "CodigoBaseMunicipio", this.model.CodigoBaseMunicipio);
      this.model.Municipios = this.collectionMunicipiofilted[0];
    }); 


    // this.changeSelect('CodigoBaseMunicipio', this.model.CodigoBaseMunicipio);
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
          (item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.Descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.Telefone.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.Celular.toLowerCase().indexOf(val.toLowerCase()) > -1)
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

  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }

  public compareWithFn = (o1, o2) => {
    return o1 === o2;
  }

}


