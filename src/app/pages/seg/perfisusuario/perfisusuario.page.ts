import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm } from '@angular/forms';
import { nextContext } from '@angular/core/src/render3';
import { parseHostBindings } from '@angular/compiler';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { forEach } from '@angular/router/src/utils/collection';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-perfisusuario',
  templateUrl: './perfisusuario.page.html',
  styleUrls: ['./perfisusuario.page.scss'],
})
export class PerfisusuarioPage implements OnInit {
  private alertCtrl: AlertController;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private router: Router
  ) { }

  public title = this.Authorizer.formTitle;
  public subtitle = this.Authorizer.formSubTitle;
  public flagFiltroAvanzado: any  = false;
  public flagForm: any = false;
  public collection: any = [];
  public collectionFilter: any = [
    {
      CodigoUsuarioSistema: '',
      Nome: '',
      SobreNome: '',
      CpfCnpj: '',
      CpfCnpjMask: '',
      Perfis: [
        {
          CodigoUsuarioPerfil: '',
          NomePerfil: ''
        }
      ]
    }
  ];
  public collectionPerfis: any = [];
  public collectionPerfisFilter: any = [];

  public model = {
    CodigoUsuarioPerfis: '', // Codigo da tabela 
    CodigoUsuarioSistema: '', // Codigo de Usuario
    CodigoUsuarioPerfil: '', // Codigo de perfil
    Nome: '',
    SobreNome: '',
    CpfCnpj: '',
    CpfCnpjMask: '',
    Perfis: ''
  };

  public modelPesquisa = {
    CodigoUsuarioPerfis: '', // Codigo da tabela 
    CodigoUsuarioSistema: '', // Codigo de Usuario
    CodigoUsuarioPerfil: '', // Codigo de perfil
    Nome: '',
    SobreNome: '',
    CpfCnpj: '',
    CpfCnpjMask: '',
    Perfis: ''
  };

  private permissoes = {
    Route: '',
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  }; // Permissoes do modulo para o usuario logado

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  private function
  ngOnInit() {
    this.getPermissoesModulo();
    this.read();
    this.readPerfis();
  }

  getPermissoesModulo() {
    if (typeof this.router !== 'undefined') {

      const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
        return (item.Route === this.router.url);
      });

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
        || (procedure === 'spPerfis') // =====================> Este procedure não será validado
      ) {
        const paramsPost = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
        };

        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, paramsPost).then(res => {
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

  salvar() {
    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: 'CREATE',
      formValues: this.model,
    };

    this.sendRequest('spPerfisPorUsuario', params, (resultado) => {
      const result = JSON.parse(atob(resultado.results))[0];
      for (const element in this.collection) {
        if (this.model.CodigoUsuarioSistema === this.collection[element].CodigoUsuarioSistema) {
          this.collection[element].Perfis.push({
            CodigoUsuarioPerfil: result.CodigoUsuarioPerfil,
            NomePerfil: result.NomePerfil
          });
        }
      }
      this.resetModel();
    });

  }

  delete(usuario: any, model: any) {
    this.model.CodigoUsuarioPerfil = model.CodigoUsuarioPerfil;
    this.model.CodigoUsuarioSistema = usuario.CodigoUsuarioSistema;

    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir o perfil: <br><strong>${model.NomePerfil}</strong>
                    do usuário <strong>${usuario.Nome} ${usuario.SobreNome}</strong>!!!`;
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
            formValues: this.model
          };

          this.sendRequest('spPerfisPorUsuario', params, (resultado) => {
            usuario.Perfis.forEach(function (perfil, index, collection) {
              if (perfil.CodigoUsuarioPerfil == this) {
                collection.splice(index, 1);
              }
            }, this.model.CodigoUsuarioPerfil);
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

    this.sendRequest('spPerfisPorUsuario', params, (resultado) => {
      const results = JSON.parse(atob(resultado.results));

      // Se é o primeiro elemento
      if (this.collection.length === 0) {
        const perfil = [];
        // Crio o primeiro elemento
        this.collection.push({
          CodigoUsuarioSistema: results[0].CodigoUsuarioSistema,
          Nome: results[0].Nome,
          SobreNome: results[0].SobreNome,
          CpfCnpj: results[0].CpfCnpj,
          CpfCnpjMask: results[0].CpfCnpjMask,
          Perfis: perfil
        });
      }

      results.map(model => {
        let perfil = null;
        // verifico se tem perfil
        if (model.CodigoUsuarioPerfis) {
          perfil = {
            CodigoUsuarioPerfil: model.CodigoUsuarioPerfil,
            NomePerfil: model.NomePerfil
          };
        }
        // Verifico se exite o modelo no collection
        let flag = Array();
        flag = [false, ''];
        for (const element in this.collection) {
          if (model.CodigoUsuarioSistema === this.collection[element].CodigoUsuarioSistema) {
            // Existe um elemento
            flag = [true, element];
          }
        }

        if (flag[0]) {
          if (perfil !== null) {
            this.collection[flag[1]].Perfis.push(perfil);
          }
        } else {
          // não existe
          model.Perfis = []
          if (perfil !== null) {
            model.Perfis.push(perfil);
          }
          delete model.CodigoUsuarioPerfis;
          delete model.NomePerfil;
          this.collection.push(model);
        }
      }
      );

      // this.collection = collectionGroup;
      this.collectionFilter = this.collection;
    });
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
    this.collectionFilter = this.collection;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.collectionFilter = this.collectionFilter.filter((item) => {
        let flag = false;
        if ((item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (item.SobreNome.toLowerCase().indexOf(val.toLowerCase()) > -1)) {
          flag = true;
        }
        let flagPerfil = false;
        item.Perfis.forEach(element => {
          if (element.hasOwnProperty('NomePerfil')) {
            if (element.NomePerfil.toLowerCase().indexOf(val.toLowerCase()) > -1) {
              flagPerfil = true;
            }
          }
        });

        if (flag || flagPerfil) {
          return item;
        }
      })
    }
  }

  public submitFiltrar(form: NgForm) {
    const dados = form.value;
    let _filter = this.env._findWhere(this.collection, dados);

    if (_filter.length > 0) {
      let perfisSelecionados = this.collectionPerfis.filter(perfil => {
        if (perfil.checked) {
          return perfil;
        }
      });

      if (perfisSelecionados.length > 0) {
        this.collectionFilter = _filter.filter(element => {
          let flag = false;
          for (const key in element.Perfis) {
            if (element.Perfis[key].hasOwnProperty('NomePerfil')) {
              perfisSelecionados.forEach(perfil => {
                if (element.Perfis[key].NomePerfil === perfil.label) {
                  flag = true;
                }
              });
            }
          }
          if (flag) {
            return element;
          }
        });
      } else {
        this.collectionFilter = _filter;
      }

    }

  }

  public create(usuario) {
    this.resetModel();
    this.model.CodigoUsuarioSistema = usuario.CodigoUsuarioSistema;

    // Filtrando os perfis
    this.collectionPerfisFilter = this.collectionPerfis.filter(model => {
      let flag = true;
      for (const key in usuario.Perfis) {
        if (usuario.Perfis[key].hasOwnProperty('CodigoUsuarioPerfil')) {
          if (usuario.Perfis[key].CodigoUsuarioPerfil === model.value) {
            flag = false;
          }
        }
      }

      if (flag) {
        return model;
      }
    })
    // console.log('Perfis:',this.collectionPerfis);
    this.presentAlertCheckbox();
    /*
    this.flagForm = true;
    */
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


  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Perfis',
      inputs: this.collectionPerfisFilter,
      buttons: [
        {
          text: 'Desistir',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (value) => {
            this.model.CodigoUsuarioPerfil = value;
            this.salvar();
          }
        }
      ]
    });

    await alert.present();
  }

  readPerfis() {
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };

    this.sendRequest('spPerfis', params, (resultado) => {
      let results = JSON.parse(atob(resultado.results));
      this.collectionPerfis = results.map(model => {
        return (
          {
            name: `cbxPerfil${model.CodigoUsuarioPerfil}`,
            type: 'radio',
            label: model.Nome,
            value: model.CodigoUsuarioPerfil,
            checked: false
          }
        )
      })
    });
  }

}

