import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { EquipamentoAfericao } from 'src/app/models/equipamento-afericao';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { Router } from '@angular/router';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
var EquipamentosAfericaoPage = /** @class */ (function () {
    function EquipamentosAfericaoPage(navCtrl, alertService, Authorizer, env, popoverController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.subtitle = 'Equipamentos aferição';
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.model = new EquipamentoAfericao;
        this.modelPesquisa = new EquipamentoAfericao;
        this.collectionTipoAfericao = [{
                codigo: '',
                tipo_afericao: ''
            }];
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
    EquipamentosAfericaoPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read();
        this.consultarTipoAfericao();
    };
    EquipamentosAfericaoPage.prototype.consultarTipoAfericao = function () {
        var _this = this;
        this.sendRequest('spTipoAfericao', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionTipoAfericao = JSON.parse(atob(resultado.results));
        });
    };
    EquipamentosAfericaoPage.prototype.getPermissoesModulo = function () {
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
    EquipamentosAfericaoPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                || (procedure === 'spTipoAfericao')) {
                var paramsQuery = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                };
                this.Authorizer.QueryStoreProc('Executar', procedure, paramsQuery).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            if (procedure === 'spEquipamentoAfericao') {
                                _this.alertService.showLoader(resultado.message, 1000);
                            }
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
    EquipamentosAfericaoPage.prototype.salvar = function () {
        var _this = this;
        // Salvando a informação no banco de dados
        var params = {
            StatusCRUD: this.model.codigo > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spEquipamentoAfericao', params, function (resultado) {
            if (params.StatusCRUD === 'CREATE') {
                _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                _this.collectionFilter = _this.collection;
            }
            else if (params.StatusCRUD === 'UPDATE') {
                _this.collectionFilter = _this.collection.map(function (item, index) {
                    if (item.codigo === _this.model.codigo) {
                        item = JSON.parse(atob(resultado.results))[0];
                    }
                    return item;
                });
                _this.collection = _this.collectionFilter;
            }
            _this.resetModel();
            _this.flagForm = !(_this.flagForm);
        });
    };
    EquipamentosAfericaoPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "Deseja excluir o usu\u00E1rio: <strong>" + model.nome + "</strong>!!!";
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
                    _this.sendRequest('spEquipamentoAfericao', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.codigo == this) {
                                collection.splice(index, 1);
                            }
                        }, model.codigo);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    EquipamentosAfericaoPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spEquipamentoAfericao', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
        });
    };
    EquipamentosAfericaoPage.prototype.edit = function (model) {
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
        }
    };
    EquipamentosAfericaoPage.prototype.goBack = function () {
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
    EquipamentosAfericaoPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    EquipamentosAfericaoPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.marca.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.modelo.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    EquipamentosAfericaoPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    EquipamentosAfericaoPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    EquipamentosAfericaoPage.prototype.mostrarPop = function (ev) {
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
    EquipamentosAfericaoPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    tslib_1.__decorate([
        ViewChild('txtNome'),
        tslib_1.__metadata("design:type", Object)
    ], EquipamentosAfericaoPage.prototype, "txtNome", void 0);
    EquipamentosAfericaoPage = tslib_1.__decorate([
        Component({
            selector: 'app-equipamentos-afericao',
            templateUrl: './equipamentos-afericao.page.html',
            styleUrls: ['./equipamentos-afericao.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router])
    ], EquipamentosAfericaoPage);
    return EquipamentosAfericaoPage;
}());
export { EquipamentosAfericaoPage };
//# sourceMappingURL=equipamentos-afericao.page.js.map