import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Lei } from 'src/app/models/leis';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { Router } from '@angular/router';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
var LeisPage = /** @class */ (function () {
    function LeisPage(navCtrl, alertService, Authorizer, env, popoverController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.subtitle = 'Leis';
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.model = new Lei;
        this.modelPesquisa = new Lei;
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
        this.compareWith = this.compareWithFn;
    }
    LeisPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read();
    };
    LeisPage.prototype.getPermissoesModulo = function () {
        var _this = this;
        var permissaoModulo = this.Authorizer.permissoesUsuario.filter(function (item) {
            return (item.Route === _this.router.url);
        });
        if (permissaoModulo.length === 1) {
            this.permissoes = {
                Route: permissaoModulo[0].Route,
                Pesquisar: permissaoModulo[0].Pesquisar,
                Inserir: permissaoModulo[0].Inserir,
                Editar: permissaoModulo[0].Editar,
                Deletar: permissaoModulo[0].Deletar
            };
        }
        else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    };
    /**
     *  
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    LeisPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))) {
                var _params = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                };
                this.Authorizer.QueryStoreProc('Executar', procedure, _params).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            _this.alertService.showLoader(resultado.message, 1000);
                        }
                        else {
                            _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: _this.subtitle, pMessage: resultado.message });
                            _this.navCtrl.back();
                        }
                    }
                    catch (err) {
                        _this.alertService.presentAlert({ pTitle: _this.env.AppNameSigla, pSubtitle: _this.subtitle, pMessage: 'Erro ao fazer a petição' });
                    }
                });
            }
            else {
                this.alertService.presentAlert({
                    pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
                });
            }
        }
        else {
            this.goBack();
        }
    };
    /*
      salvar(form: NgForm) {
        // Salvando a informação no banco de dados
        const params = {
          StatusCRUD: this.model.codigo > 0 ? 'UPDATE' : 'CREATE',
          formValues: this.model,
        };
    
        this.sendRequest('spLeis', params, (resultado) => {
          if (params.StatusCRUD === 'CREATE') {
            this.collection.push(JSON.parse(atob(resultado.results))[0]);
            this.collectionFilter =  this.collection;
          } else if (params.StatusCRUD === 'UPDATE') {
            this.collectionFilter = this.collection.map((item, index) => {
              if (item.codigo === this.model.codigo) {
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
      */
    /*
      delete(model: Lei) {
        const alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = `Deseja excluir o usuário: <strong>${model.descricao_breve}</strong>!!!`;
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
    
              this.sendRequest('spLeis', params, (resultado) => {
                this.collection.forEach(function (model, index, collection) {
                  if (model.codigo == this) {
                    collection.splice(index, 1);
                  }
                }, model.codigo);
                this.resetModel();
              });
    
            }
          }
        ];
    
        document.body.appendChild(alert);
        return alert.present();
      }
    */
    LeisPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spLeis', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
        });
    };
    /*
      edit(model: any) {
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (const key in model) {
          this.model[key] = model[key];
        }
      }
    */
    LeisPage.prototype.goBack = function () {
        if (this.flagForm) {
            // Se o formulario está ativo, então altera a flagForm para que mostre a lista
            this.flagForm = false;
            this.resetModel();
        }
        else if (this.flagFiltroAvanzado) {
            // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
            this.flagFiltroAvanzado = false;
            this.collectionFilter = this.collection;
        }
        else {
            this.navCtrl.back();
        }
    };
    LeisPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    LeisPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.descricao_breve.toLowerCase().indexOf(val.toLowerCase()) > -1)
                    || (item.codigo.toString().toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    LeisPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    /*
      public create() {
        this.resetModel();
        this.flagForm = true;
      }
    */
    LeisPage.prototype.mostrarPop = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopinfoComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (typeof data !== 'undefined') {
                            if (data.item === 'BUSCAR') {
                                this.flagFiltroAvanzado = true;
                                this.flagForm = false;
                                this.collectionFilter = [];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LeisPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    LeisPage = tslib_1.__decorate([
        Component({
            selector: 'app-leis',
            templateUrl: './leis.page.html',
            styleUrls: ['./leis.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router])
    ], LeisPage);
    return LeisPage;
}());
export { LeisPage };
//# sourceMappingURL=leis.page.js.map