import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { RouterOutlet, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
var PerfisusuarioPage = /** @class */ (function () {
    function PerfisusuarioPage(navCtrl, alertService, Authorizer, env, popoverController, alertController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.alertController = alertController;
        this.router = router;
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.collectionFilter = [
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
        this.collectionPerfis = [];
        this.collectionPerfisFilter = [];
        this.model = {
            CodigoUsuarioPerfis: '',
            CodigoUsuarioSistema: '',
            CodigoUsuarioPerfil: '',
            Nome: '',
            SobreNome: '',
            CpfCnpj: '',
            CpfCnpjMask: '',
            Perfis: ''
        };
        this.modelPesquisa = {
            CodigoUsuarioPerfis: '',
            CodigoUsuarioSistema: '',
            CodigoUsuarioPerfil: '',
            Nome: '',
            SobreNome: '',
            CpfCnpj: '',
            CpfCnpjMask: '',
            Perfis: ''
        };
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
    }
    PerfisusuarioPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read();
        this.readPerfis();
    };
    PerfisusuarioPage.prototype.getPermissoesModulo = function () {
        var _this = this;
        if (typeof this.router !== 'undefined') {
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
        }
    };
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    PerfisusuarioPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                || (procedure === 'spPerfis') // =====================> Este procedure não será validado
            ) {
                var paramsPost = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                };
                this.Authorizer.QueryStoreProc('Executar', procedure, paramsPost).then(function (res) {
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
                    pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
                });
            }
        }
        else {
            this.goBack();
        }
    };
    PerfisusuarioPage.prototype.salvar = function () {
        var _this = this;
        // Salvando a informação no banco de dados
        var params = {
            StatusCRUD: 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spPerfisPorUsuario', params, function (resultado) {
            var result = JSON.parse(atob(resultado.results))[0];
            for (var element in _this.collection) {
                if (_this.model.CodigoUsuarioSistema === _this.collection[element].CodigoUsuarioSistema) {
                    _this.collection[element].Perfis.push({
                        CodigoUsuarioPerfil: result.CodigoUsuarioPerfil,
                        NomePerfil: result.NomePerfil
                    });
                }
            }
            _this.resetModel();
        });
    };
    PerfisusuarioPage.prototype.delete = function (usuario, model) {
        var _this = this;
        this.model.CodigoUsuarioPerfil = model.CodigoUsuarioPerfil;
        this.model.CodigoUsuarioSistema = usuario.CodigoUsuarioSistema;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "Deseja excluir o perfil: <br><strong>" + model.NomePerfil + "</strong>\n                    do usu\u00E1rio <strong>" + usuario.Nome + " " + usuario.SobreNome + "</strong>!!!";
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
                        formValues: _this.model
                    };
                    _this.sendRequest('spPerfisPorUsuario', params, function (resultado) {
                        usuario.Perfis.forEach(function (perfil, index, collection) {
                            if (perfil.CodigoUsuarioPerfil == this) {
                                collection.splice(index, 1);
                            }
                        }, _this.model.CodigoUsuarioPerfil);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    PerfisusuarioPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spPerfisPorUsuario', params, function (resultado) {
            var results = JSON.parse(atob(resultado.results));
            // Se é o primeiro elemento
            if (_this.collection.length === 0) {
                var perfil = [];
                // Crio o primeiro elemento
                _this.collection.push({
                    CodigoUsuarioSistema: results[0].CodigoUsuarioSistema,
                    Nome: results[0].Nome,
                    SobreNome: results[0].SobreNome,
                    CpfCnpj: results[0].CpfCnpj,
                    CpfCnpjMask: results[0].CpfCnpjMask,
                    Perfis: perfil
                });
            }
            results.map(function (model) {
                var perfil = null;
                // verifico se tem perfil
                if (model.CodigoUsuarioPerfis) {
                    perfil = {
                        CodigoUsuarioPerfil: model.CodigoUsuarioPerfil,
                        NomePerfil: model.NomePerfil
                    };
                }
                // Verifico se exite o modelo no collection
                var flag = Array();
                flag = [false, ''];
                for (var element in _this.collection) {
                    if (model.CodigoUsuarioSistema === _this.collection[element].CodigoUsuarioSistema) {
                        // Existe um elemento
                        flag = [true, element];
                    }
                }
                if (flag[0]) {
                    if (perfil !== null) {
                        _this.collection[flag[1]].Perfis.push(perfil);
                    }
                }
                else {
                    // não existe
                    model.Perfis = [];
                    if (perfil !== null) {
                        model.Perfis.push(perfil);
                    }
                    delete model.CodigoUsuarioPerfis;
                    delete model.NomePerfil;
                    _this.collection.push(model);
                }
            });
            // this.collection = collectionGroup;
            _this.collectionFilter = _this.collection;
        });
    };
    PerfisusuarioPage.prototype.goBack = function () {
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
    PerfisusuarioPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    PerfisusuarioPage.prototype.getItems = function (ev) {
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                var flag = false;
                if ((item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.SobreNome.toLowerCase().indexOf(val.toLowerCase()) > -1)) {
                    flag = true;
                }
                var flagPerfil = false;
                item.Perfis.forEach(function (element) {
                    if (element.hasOwnProperty('NomePerfil')) {
                        if (element.NomePerfil.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                            flagPerfil = true;
                        }
                    }
                });
                if (flag || flagPerfil) {
                    return item;
                }
            });
        }
    };
    PerfisusuarioPage.prototype.submitFiltrar = function (form) {
        var dados = form.value;
        var _filter = this.env._findWhere(this.collection, dados);
        if (_filter.length > 0) {
            var perfisSelecionados_1 = this.collectionPerfis.filter(function (perfil) {
                if (perfil.checked) {
                    return perfil;
                }
            });
            if (perfisSelecionados_1.length > 0) {
                this.collectionFilter = _filter.filter(function (element) {
                    var flag = false;
                    var _loop_1 = function (key) {
                        if (element.Perfis[key].hasOwnProperty('NomePerfil')) {
                            perfisSelecionados_1.forEach(function (perfil) {
                                if (element.Perfis[key].NomePerfil === perfil.label) {
                                    flag = true;
                                }
                            });
                        }
                    };
                    for (var key in element.Perfis) {
                        _loop_1(key);
                    }
                    if (flag) {
                        return element;
                    }
                });
            }
            else {
                this.collectionFilter = _filter;
            }
        }
    };
    PerfisusuarioPage.prototype.create = function (usuario) {
        this.resetModel();
        this.model.CodigoUsuarioSistema = usuario.CodigoUsuarioSistema;
        // Filtrando os perfis
        this.collectionPerfisFilter = this.collectionPerfis.filter(function (model) {
            var flag = true;
            for (var key in usuario.Perfis) {
                if (usuario.Perfis[key].hasOwnProperty('CodigoUsuarioPerfil')) {
                    if (usuario.Perfis[key].CodigoUsuarioPerfil === model.value) {
                        flag = false;
                    }
                }
            }
            if (flag) {
                return model;
            }
        });
        this.presentAlertCheckbox();
        /*this.flagForm = true;
        */
    };
    PerfisusuarioPage.prototype.mostrarPop = function (ev) {
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
    PerfisusuarioPage.prototype.presentAlertCheckbox = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Perfis',
                            inputs: this.collectionPerfisFilter,
                            buttons: [
                                {
                                    text: 'Desistir',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Confirmar',
                                    handler: function (value) {
                                        _this.model.CodigoUsuarioPerfil = value;
                                        _this.salvar();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PerfisusuarioPage.prototype.readPerfis = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spPerfis', params, function (resultado) {
            var results = JSON.parse(atob(resultado.results));
            _this.collectionPerfis = results.map(function (model) {
                return ({
                    name: "cbxPerfil" + model.CodigoUsuarioPerfil,
                    type: 'radio',
                    label: model.Nome,
                    value: model.CodigoUsuarioPerfil,
                    checked: false
                });
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(RouterOutlet),
        tslib_1.__metadata("design:type", RouterOutlet)
    ], PerfisusuarioPage.prototype, "outlet", void 0);
    PerfisusuarioPage = tslib_1.__decorate([
        Component({
            selector: 'app-perfisusuario',
            templateUrl: './perfisusuario.page.html',
            styleUrls: ['./perfisusuario.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            AlertController,
            Router])
    ], PerfisusuarioPage);
    return PerfisusuarioPage;
}());
export { PerfisusuarioPage };
//# sourceMappingURL=perfisusuario.page.js.map