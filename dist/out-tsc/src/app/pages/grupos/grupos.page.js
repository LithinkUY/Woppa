import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
var GruposPage = /** @class */ (function () {
    function GruposPage(navCtrl, alertService, Authorizer, env, popoverController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.collectionSegmentos = {
            CodigoSegmento: '',
            Nome: ''
        };
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.collectionFilter = [];
        this.model = {
            CodigoSegmento: '',
            NomeSegmento: '',
            CodigoGrupo: '',
            Grupo: ''
        };
        this.modelPesquisa = {
            Grupo: '',
            NomeSegmento: ''
        };
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
    }
    GruposPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.readSegmentos();
        this.read();
    };
    GruposPage.prototype.getPermissoesModulo = function () {
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
    GruposPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                || (procedure === 'spSegmentos')) {
                var paramsQuery = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre est?? este valor
                };
                this.Authorizer.QueryStoreProc('Executar', procedure, paramsQuery).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            _this.alertService.showLoader(resultado.message, 1000);
                        }
                        else {
                            _this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: _this.subtitle, pMessage: resultado.message });
                            _this.navCtrl.back();
                        }
                    }
                    catch (err) {
                        _this.alertService.presentAlert({
                            pTitle: environment.AppNameSigla,
                            pSubtitle: _this.subtitle,
                            pMessage: 'Erro ao fazer a peti????o'
                        });
                    }
                });
            }
            else {
                this.alertService.presentAlert({ pTitle: 'SEM PERMISS??O', pSubtitle: this.subtitle, pMessage: 'Voc?? n??o tem permiss??o para esta a????o' });
            }
        }
        else {
            this.goBack();
        }
    };
    GruposPage.prototype.salvar = function (form) {
        var _this = this;
        // Salvando a informa????o no banco de dados
        var params = {
            StatusCRUD: parseInt(this.model.CodigoGrupo) > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spGrupos', params, function (resultado) {
            if (params.StatusCRUD === 'CREATE') {
                _this.collection.push(JSON.parse(atob(resultado.results))[0]);
            }
            else if (params.StatusCRUD === 'UPDATE') {
                _this.collection.forEach(function (item, index) {
                    if (item.CodigoGrupo === _this.model.CodigoGrupo) {
                        _this.collection[index] = JSON.parse(atob(resultado.results))[0];
                    }
                });
            }
            _this.resetModel();
            _this.flagForm = !(_this.flagForm);
        });
    };
    GruposPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Exclu??ndo!';
        alert.message = "Deseja excluir o grupo: <strong>" + model.Grupo + "</strong>!!!";
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
                    _this.sendRequest('spGrupos', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoGrupo == this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoGrupo);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    GruposPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informa????o do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spGrupos', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
        });
    };
    GruposPage.prototype.edit = function (model) {
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
        }
    };
    GruposPage.prototype.goBack = function () {
        if (this.flagForm) {
            // Se o formulario est?? ativo, ent??o altera a flagForm para que mostre a lista
            this.flagForm = false;
            this.resetModel();
        }
        else if (this.flagFiltroAvanzado) {
            // Se o Filtro avanzado est?? mostrando, ent??o altera a flagFiltroAvanzado para que mostre o filtro basico
            this.flagFiltroAvanzado = false;
            this.collectionFilter = this.collection;
        }
        else {
            this.navCtrl.back();
        }
    };
    GruposPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    GruposPage.prototype.getItems = function (ev) {
        //this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.Grupo.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.NomeSegmento.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    GruposPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    GruposPage.prototype.create = function () {
        this.flagForm = true;
        this.resetModel();
    };
    GruposPage.prototype.mostrarPop = function (ev) {
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
    GruposPage.prototype.readSegmentos = function () {
        var _this = this;
        // Obtendo a informa????o do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spSegmentos', params, function (resultado) {
            _this.collectionSegmentos = JSON.parse(atob(resultado.results));
        });
    };
    GruposPage = tslib_1.__decorate([
        Component({
            selector: 'app-grupos',
            templateUrl: './grupos.page.html',
            styleUrls: ['./grupos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router])
    ], GruposPage);
    return GruposPage;
}());
export { GruposPage };
//# sourceMappingURL=grupos.page.js.map