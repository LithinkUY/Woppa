import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { ActivatedRoute } from '@angular/router';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { environment } from '../../../environments/environment.prod';
var PermissoesPage = /** @class */ (function () {
    function PermissoesPage(navCtrl, alertService, Authorizer, env, route, popoverController) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.route = route;
        this.popoverController = popoverController;
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
        this.collection = [];
        this.collectionPerfis = [];
        this.collectionFilterPerfis = [];
        this.collectionFilterRules = [];
        this.flagFilter = false;
        this.modelPerfil = {
            CodigoUsuarioPerfil: null,
            Nome: '',
            Descricao: ''
        };
    }
    PermissoesPage.prototype.ngOnInit = function () {
        this.mostrarPerfis();
    };
    PermissoesPage.prototype.mostrarPermissoesDoPerfil = function (perfil) {
        this.flagFilter = true;
        this.modelPerfil = perfil;
        this.subtitlePerfil = this.modelPerfil.Nome;
        this.read();
    };
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    PermissoesPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
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
                        // this.alertService.showLoader(resultado.message, 500);
                    }
                    else {
                        _this.alertService.presentAlert({
                            pTitle: 'ATENÇÃO',
                            pSubtitle: _this.subtitle,
                            pMessage: resultado.message
                        });
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
            this.goBack();
        }
    };
    PermissoesPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoUsuarioPerfil: this.modelPerfil.CodigoUsuarioPerfil }
        };
        this.sendRequest('spMenuPerfisRules', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilterRules = _this.collection;
        });
    };
    PermissoesPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    PermissoesPage.prototype.salvarPermissaoVer = function (item, value) {
        this._salvar(item, value, 'Ver');
    };
    PermissoesPage.prototype.salvarPermissaoPesquisar = function (item, value) {
        this._salvar(item, value, 'Pesquisar');
    };
    PermissoesPage.prototype.salvarPermissaoInserir = function (item, value) {
        this._salvar(item, value, 'Inserir');
    };
    PermissoesPage.prototype.salvarPermissaoEditar = function (item, value) {
        this._salvar(item, value, 'Editar');
    };
    PermissoesPage.prototype.salvarPermissaoDeletar = function (item, value) {
        this._salvar(item, value, 'Deletar');
    };
    PermissoesPage.prototype._salvar = function (item, value, acao) {
        var itemPost = item;
        itemPost[acao] = value;
        if (parseInt(item.CodigoMenuPefisRules) === 0) {
            // Create
            itemPost.CodigoUsuarioPerfil = this.modelPerfil.CodigoUsuarioPerfil;
            itemPost.CodigoMenuPefisRules = '';
        }
        var params = {
            StatusCRUD: parseInt(item.CodigoMenuPefisRules) > 0 ? 'UPDATE' : 'CREATE',
            formValues: itemPost,
        };
        this.sendRequest('spMenuPerfisRules', params, function (resultado) {
        });
    };
    PermissoesPage.prototype.mostrarPerfis = function () {
        var _this = this;
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spPerfis', params, function (resultado) {
            _this.collectionPerfis = JSON.parse(atob(resultado.results));
            _this.collectionFilterPerfis = _this.collectionPerfis;
        });
    };
    PermissoesPage.prototype.mostrarPop = function (ev) {
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
                                this.collection = [];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PermissoesPage.prototype.PerfisGetItems = function (ev) {
        this.flagFilter = false;
        this.collectionFilterRules = [];
        this.collectionFilterPerfis = this.collectionPerfis;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilterPerfis = this.collectionFilterPerfis.filter(function (item) {
                return ((item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    PermissoesPage.prototype.RulesGetItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilterRules = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilterRules = this.collectionFilterRules.filter(function (item) {
                return ((item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    PermissoesPage = tslib_1.__decorate([
        Component({
            selector: 'app-permissoes',
            templateUrl: './permissoes.page.html',
            styleUrls: ['./permissoes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            ActivatedRoute,
            PopoverController])
    ], PermissoesPage);
    return PermissoesPage;
}());
export { PermissoesPage };
//# sourceMappingURL=permissoes.page.js.map