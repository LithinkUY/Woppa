import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Contatos } from 'src/app/models/contatos';
var ContatosPage = /** @class */ (function () {
    function ContatosPage(navCtrl, alertService, Authorizer, env, popoverController, router, platform) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.platform = platform;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = "Editando Contato"; // this.Authorizer.formSubTitle; // 'Usuário';
        this.subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.model = new Contatos;
        this.modelPesquisa = new Contatos;
        this.collectionSegmentos = [{
                CodigoSegmento: '',
                Nome: ''
            }];
        this.collectionGrupos = [{
                CodigoGrupo: '',
                CodigoSegmento: '',
                Grupo: ''
            }];
        this.collectionUfs = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionUfsRgRespOrgExp = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionMunicipios = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0
            }];
        this.permissoes = {
            Route: '',
            Ver: 0,
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
    }
    // compareWith = this.compareWithFn;
    ContatosPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read();
        // Segmentos
        // this.consultarSegmentos();
        // Uf
        this.consultarUFs();
    };
    ContatosPage.prototype.consultarUFs = function () {
        var _this = this;
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUfs = JSON.parse(atob(resultado.results));
            _this.collectionUfsRgRespOrgExp = JSON.parse(atob(resultado.results));
        });
    };
    ContatosPage.prototype.getPermissoesModulo = function () {
        var _this = this;
        var permissaoModulo = this.Authorizer.permissoesUsuario.filter(function (item) {
            return (item.Route === _this.router.url);
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
        }
        else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    };
    ContatosPage.prototype.isPortrait = function () {
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
        }
        else {
            return true;
        }
    };
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    ContatosPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
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
                var paramsSend = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                };
                this.Authorizer.QueryStoreProc('Executar', procedure, paramsSend).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            if (procedure === 'spContatos') {
                                _this.alertService.showLoader(resultado.message, 1000);
                            }
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
    ContatosPage.prototype.salvar = function (form) {
        var _this = this;
        // Salvando a informação no banco de dados
        var params = {
            StatusCRUD: this.model.CodigoContato > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spContatos', params, function (resultado) {
            if (params.StatusCRUD === 'CREATE') {
                _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                _this.collectionFilter = _this.collection;
            }
            else if (params.StatusCRUD === 'UPDATE') {
                _this.collectionFilter = _this.collection.map(function (item, index) {
                    if (item.CodigoContato === _this.model.CodigoContato) {
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
    ContatosPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "<strong>" + model.Nome + "</strong>!!!";
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
                    _this.sendRequest('spContatos', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoContato === this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoContato);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    ContatosPage.prototype.read = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        var params = {
            StatusCRUD: 'READ',
            formValues: ''
        };
        this.sendRequest('spContatos', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
        });
    };
    ContatosPage.prototype.edit = function (model) {
        var _this = this;
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (var key in model) {
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
        // Municipios
        this.sendRequest('spCarregaMunicipios', {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
        }, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
        // this.changeSelect('CodigoBaseMunicipio', this.model.CodigoBaseMunicipio);
    };
    ContatosPage.prototype.goBack = function () {
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
    ContatosPage.prototype.FormClose = function () {
        this.flagForm = false;
    };
    ContatosPage.prototype.formatMask = function (fieldName, Value, type) {
        this.model[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    ContatosPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    ContatosPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.Nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Telefone.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Celular.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    ContatosPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    ContatosPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    ContatosPage.prototype.mostrarPop = function (ev) {
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
    ContatosPage.prototype.carregarSelectGrupo = function (option) {
        // this.model.CodigoSegmento = option.target.value;
        // this.model.CodigoGrupo = 0;
        var _this = this;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoSegmento: option.target.value }
        };
        this.sendRequest('spCarregaGrupos', params, function (resultado) {
            _this.collectionGrupos = JSON.parse(atob(resultado.results));
        });
    };
    ContatosPage.prototype.carregarSelectMunicipio = function (value) {
        var _this = this;
        this.model.CodigoBaseUF = value;
        // this.model.CodigoMunicipio = 0;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
        };
        this.sendRequest('spCarregaMunicipios', params, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
    };
    ContatosPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    tslib_1.__decorate([
        ViewChild('txtNome'),
        tslib_1.__metadata("design:type", Object)
    ], ContatosPage.prototype, "txtNome", void 0);
    ContatosPage = tslib_1.__decorate([
        Component({
            selector: 'app-contatos',
            templateUrl: './contatos.page.html',
            styleUrls: ['./contatos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router,
            Platform])
    ], ContatosPage);
    return ContatosPage;
}());
export { ContatosPage };
//# sourceMappingURL=contatos.page.js.map