import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { nextContext } from '@angular/core/src/render3';
import { parseHostBindings } from '@angular/compiler';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  private alertCtrl: AlertController;
  private collectionSegmentos: any = {
    CodigoSegmento: '',
    Nome: ''
  };

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router
  ) { }

  public title = this.Authorizer.formTitle;
  public subtitle = this.Authorizer.formSubTitle;  
  public flagFiltroAvanzado: boolean = false;
  public flagForm: boolean = false;
  public collection: any = [];
  public collectionFilter: any = [];

  public model = {
    CodigoSegmento: '',
    NomeSegmento: '',
    CodigoGrupo: '',
    Grupo: ''
  };

  public modelPesquisa = {
    Grupo: '',
    NomeSegmento: ''
  };

  private permissoes = {
    Route: '',
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado

  private function
  ngOnInit() {
    this.getPermissoesModulo();
    this.readSegmentos();
    this.read();
  }

  getPermissoesModulo() {
    const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
      return (item.Route === this.router.url)
    })

    if (permissaoModulo.length === 1) {
      this.permissoes = {
        Route: permissaoModulo[0].Route,
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
      if (
        ((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        || (procedure === 'spSegmentos')
      ) {
        const paramsQuery = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
        };

        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsQuery).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              this.alertService.showLoader(resultado.message, 1000);
            } else {
              this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
              this.navCtrl.back();
            }
          } catch (err) {
            this.alertService.presentAlert({ 
              pTitle:environment.AppNameSigla, 
              pSubtitle: this.subtitle, 
              pMessage: 'Erro ao fazer a petição' 
            });
          }
        });
      } else {
        this.alertService.presentAlert(
          { pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação' });
      }
    } else {
      this.goBack();
    }
  }

  salvar(form: NgForm) {
    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: parseInt(this.model.CodigoGrupo) > 0 ? 'UPDATE' : 'CREATE',
      formValues: this.model,
    };

    this.sendRequest('spGrupos', params, (resultado) => {
      if (params.StatusCRUD === 'CREATE') {
        this.collection.push(JSON.parse(atob(resultado.results))[0]);
      } else if (params.StatusCRUD === 'UPDATE') {
        this.collection.forEach((item, index) => {
          if (item.CodigoGrupo === this.model.CodigoGrupo) {
            this.collection[index] = JSON.parse(atob(resultado.results))[0];
          }
        });
      }

      this.resetModel();
      this.flagForm = !(this.flagForm);
    });
  }

  delete(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir o grupo: <strong>${model.Grupo}</strong>!!!`;
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

          this.sendRequest('spGrupos', params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.CodigoGrupo == this) {
                collection.splice(index, 1);
              }
            }, model.CodigoGrupo);
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

    this.sendRequest('spGrupos', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilter = this.collection;
    });
  }

  edit(model: any) {
    this.flagForm = true;
    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }
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

  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = '';
    }
  }


  public getItems(ev: any) {
    //this.CarregaMenuPrincipalStatic();
    this.collectionFilter = this.collection;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.collectionFilter = this.collectionFilter.filter((item) => {
        return (
          (item.Grupo.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.NomeSegmento.toLowerCase().indexOf(val.toLowerCase()) > -1));
      })
    }
  }

  public submitFiltrar(form: NgForm) {
    this.collectionFilter = this.collection;
    const dados = form.value;
    this.collectionFilter = this.env._findWhere(this.collectionFilter, dados)
  }

  public create() {
    this.flagForm = true;
    this.resetModel();
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

  readSegmentos() {
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };

    this.sendRequest('spSegmentos', params, (resultado) => {
      this.collectionSegmentos = JSON.parse(atob(resultado.results));
    });
  }

}

