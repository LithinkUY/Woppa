import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { ActivatedRoute } from '@angular/router';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.page.html',
  styleUrls: ['./permissoes.page.scss'],
})
export class PermissoesPage implements OnInit {

  constructor(
    
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    // private env: EnvService,
    // private route: ActivatedRoute,
    private popoverController: PopoverController

  ) { }

  public title = this.Authorizer.formTitle;
  public subtitle = this.Authorizer.formSubTitle;
  public subtitlePerfil: string;
  public collection: any = [];
  public collectionPerfis: any = [];
  public collectionFilterPerfis: any = [];
  public collectionFilterRules: any = [];

  public flagFilter: any = false;

  public modelPerfil = {
    CodigoUsuarioPerfil: null,
    Nome: '',
    Descricao: ''
  };

  ngOnInit() {
    this.mostrarPerfis();
  }

  mostrarPermissoesDoPerfil(perfil) {
    this.flagFilter = true;
    this.modelPerfil = perfil;
    this.subtitlePerfil = this.modelPerfil.Nome;
    this.read();
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
            // this.alertService.showLoader(resultado.message, 500);
          } else {
            this.alertService.presentAlert({ 
              pTitle: 'ATENÇÃO', 
              pSubtitle: this.subtitle, 
              pMessage: resultado.message });
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
      this.goBack();
    }
  }

  read() {
    // Obtendo a informação do banco de dados
    const params = {
      StatusCRUD: 'READ',
      formValues: { CodigoUsuarioPerfil: this.modelPerfil.CodigoUsuarioPerfil }
    };

    this.sendRequest('spMenuPerfisRules', params, (resultado) => {
      this.collection = JSON.parse(atob(resultado.results));
      this.collectionFilterRules = this.collection;
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  salvarPermissaoVer(item, value) {
    this._salvar(item, value, 'Ver');
  }

  salvarPermissaoPesquisar(item, value) {
    this._salvar(item, value, 'Pesquisar');
  }

  salvarPermissaoInserir(item, value) {
    this._salvar(item, value, 'Inserir');
  }

  salvarPermissaoEditar(item, value) {
    this._salvar(item, value, 'Editar');
  }

  salvarPermissaoDeletar(item, value) {
    this._salvar(item, value, 'Deletar');
  }

  private _salvar(item: any, value: boolean, acao: string) {
    const itemPost = item;
    itemPost[acao] = value;
    if (parseInt(item.CodigoMenuPefisRules) === 0) {
      // Create
      itemPost.CodigoUsuarioPerfil = this.modelPerfil.CodigoUsuarioPerfil;
      itemPost.CodigoMenuPefisRules = '';
    }
    const params = {
      StatusCRUD: parseInt(item.CodigoMenuPefisRules) > 0 ? 'UPDATE' : 'CREATE',
      formValues: itemPost,
    };

    this.sendRequest('spMenuPerfisRules', params, (resultado) => {

    });
  }

  mostrarPerfis() {
    const params = {
      StatusCRUD: 'READ',
      formValues: ''
    };
    this.sendRequest('spPerfis', params, (resultado) => {
      this.collectionPerfis = JSON.parse(atob(resultado.results));
      this.collectionFilterPerfis = this.collectionPerfis;
    });
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
        this.collection = [];
      }
    }
  }


  public PerfisGetItems(ev: any) {
    this.flagFilter = false;
    this.subtitlePerfil = '';

    this.collectionFilterRules = [];
    this.collectionFilterPerfis = this.collectionPerfis;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.collectionFilterPerfis = this.collectionFilterPerfis.filter((item) => {
        return (
          (item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
        );
      });
    }
  }

  public RulesGetItems(ev: any) {
    // this.CarregaMenuPrincipalStatic();
    this.collectionFilterRules = this.collection;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.collectionFilterRules = this.collectionFilterRules.filter((item) => {
        return (
          (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        );
      });
    }
  }


}




