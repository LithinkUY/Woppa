import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
var PerfisPage = /** @class */ (function () {
    function PerfisPage(navCtrl, alertService, Authorizer, env, popoverController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.model = {
            CodigoUsuarioPerfil: '',
            Nome: '',
            Descricao: ''
        };
        this.modelPesquisa = {
            Nome: '',
            Descricao: ''
        };
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
    }
    PerfisPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read();
    };
    PerfisPage.prototype.getPermissoesModulo = function () {
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
    PerfisPage.prototype.sendRequest = function (procedure, params, next) {
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
                        _this.alertService.presentAlert({
                            pTitle: environment.AppNameSigla,
                            pSubtitle: _this.subtitle,
                            pMessage: 'Erro ao fazer a petição'
                        });
                    }
                });
            }
            else {
                this.alertService.presentAlert({
                    pTitle: 'SEM PERMISSÃO',
                    pSubtitle: this.subtitle,
                    pMessage: 'Você não tem permissão para esta ação'
                });
            }
        }
        else {
            this.goBack();
        }
    };
    PerfisPage.prototype.salvar = function (form) {
        var _this = this;
        // Salvando a informação no banco de dados
        var params = {
            StatusCRUD: parseInt(this.model.CodigoUsuarioPerfil) > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spPerfis', params, function (resultado) {
            if (params.StatusCRUD === 'CREATE') {
                _this.collection.push(JSON.parse(atob(resultado.results))[0]);
            }
            else if (params.StatusCRUD === 'UPDATE') {
                _this.collection.forEach(function (item, index) {
                    if (item.CodigoUsuarioPerfil === _this.model.CodigoUsuarioPerfil) {
                        _this.collection[index] = JSON.parse(atob(resultado.results))[0];
                    }
                });
            }
            _this.resetModel();
            _this.flagForm = !(_this.flagForm);
        });
    };
    PerfisPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "Deseja excluir o perfil: <strong>" + model.Nome + "</strong>!!!";
        alert.buttons = [
            {
                text: 'Desistir',
                role: 'cancel',
                cssClass: 'secondary',
                handler: function (blah) {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: 'Confirmar',
                handler: function () {
                    var params = {
                        StatusCRUD: 'DELETE',
                        formValues: model
                    };
                    _this.sendRequest('spPerfis', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoUsuarioPerfil == this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoUsuarioPerfil);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    PerfisPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spPerfis', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
        });
    };
    PerfisPage.prototype.edit = function (model) {
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
        }
        this.txtNome.setFocus();
    };
    PerfisPage.prototype.goBack = function () {
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
    PerfisPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    PerfisPage.prototype.getItems = function (ev) {
        //this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Descricao.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    PerfisPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    PerfisPage.prototype.create = function () {
        this.flagForm = true;
        this.resetModel();
    };
    PerfisPage.prototype.mostrarPop = function (ev) {
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
    PerfisPage.prototype.mostrarPermissoes = function (model) {
        var codigo = model.CodigoUsuarioPerfil;
        this.navCtrl.navigateForward("menu/permissoes/perfil/" + codigo);
    };
    tslib_1.__decorate([
        ViewChild('txtNome'),
        tslib_1.__metadata("design:type", Object)
    ], PerfisPage.prototype, "txtNome", void 0);
    PerfisPage = tslib_1.__decorate([
        Component({
            selector: 'app-perfis',
            templateUrl: './perfis.page.html',
            styleUrls: ['./perfis.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router])
    ], PerfisPage);
    return PerfisPage;
}());
export { PerfisPage };
//# sourceMappingURL=perfis.page.js.map