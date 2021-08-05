import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { Unidades } from 'src/app/models/unidades';
import { environment } from 'src/environments/environment.prod';
var UnidadesPage = /** @class */ (function () {
    function UnidadesPage(navCtrl, alertService, Authorizer, env, popoverController, router, platform) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.platform = platform;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = "Editando Unidade"; //this.Authorizer.formSubTitle; // 'Usuário';  
        this.subtitlefrm = this.Authorizer.formSubTitle; // 'Usuário';
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.model = new Unidades;
        this.modelPesquisa = new Unidades;
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
        this.collectionUnidadeSituacao = [{
                CodigoUnidadeSituacao: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionUnidadeSituacaoFilted = [{
                CodigoUnidadeSituacao: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionUnidadeTipo = [{
                CodigoUnidadeTipo: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionUnidadeTipoFilted = [{
                CodigoUnidadeTipo: 0,
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
        this.collectionMunicipiofilted = [{
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
        this.RowsPageDef = 4;
        this.PageNumber = 1;
        this.RowsPage = 5;
        this.Paginas = [];
        this.getObjectByValue = function (array, key, value) {
            return array.filter(function (object) {
                return object[key] === value;
            });
        };
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
    }
    // compareWith = this.compareWithFn;
    UnidadesPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read(1, this.RowsPageDef);
        this.consultarUFs();
        this.consultarUnidadeTipo();
        this.consultarUnidadeSituacao();
    };
    UnidadesPage.prototype.consultarUFs = function () {
        var _this = this;
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUfs = JSON.parse(atob(resultado.results));
            _this.collectionUfsRgRespOrgExp = JSON.parse(atob(resultado.results));
        });
    };
    UnidadesPage.prototype.consultarUnidadeTipo = function () {
        var _this = this;
        this.sendRequest('spCarregaUnidadeTipo', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUnidadeTipo = JSON.parse(atob(resultado.results));
        });
    };
    UnidadesPage.prototype.consultarUnidadeSituacao = function () {
        var _this = this;
        this.sendRequest('spCarregaUnidadeSituacao', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUnidadeSituacao = JSON.parse(atob(resultado.results));
        });
    };
    UnidadesPage.prototype.getPermissoesModulo = function () {
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
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    UnidadesPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                || (procedure === 'spCarregaUnidadeTipo')
                || (procedure === 'spCarregaUnidadeSituacao')
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
                // console.log( JSON.stringify(paramsSend) );
                this.Authorizer.QueryStoreProc('Executar', procedure, paramsSend).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            if (procedure === 'spUnidades') {
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
    UnidadesPage.prototype.salvar = function (form) {
        // Salvando a informação no banco de dados
        var _this = this;
        var params = {
            StatusCRUD: this.model.CodigoUnidade > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spUnidades', params, function (resultado) {
            if (params.StatusCRUD === 'CREATE') {
                _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                _this.collectionFilter = _this.collection;
            }
            else if (params.StatusCRUD === 'UPDATE') {
                _this.collectionFilter = _this.collection.map(function (item, index) {
                    if (item.CodigoUnidade === _this.model.CodigoUnidade) {
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
    UnidadesPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "<strong>" + model.NomeSocial + "</strong>!!!";
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
                    _this.sendRequest('spEmpresa', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoUnidade === this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoUnidade);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    UnidadesPage.prototype.read = function (pPageNumber, pRowsPage) {
        var _this = this;
        // Obtendo a informação do banco de dados    
        var params = {
            StatusCRUD: 'READ',
            formValues: {
                pageNumber: pPageNumber,
                rowspPage: pRowsPage
            }
        };
        this.sendRequest('spUnidades', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
            _this.RecordCount = _this.collectionFilter[0].RecordCount;
            _this.showPages(_this.PageNumber, _this.RowsPage);
        });
    };
    UnidadesPage.prototype.edit = function (model) {
        var _this = this;
        this.flagForm = true;
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
        }
        // this.model.CodigoUnidadeSituacao = this.getObjectByValue(this.collectionUnidadeTipo, "CodigoUnidadeTipo", this.model.CodigoUnidadeSituacao);
        // this.model.CodigoUnidadeTipo = this.getObjectByValue(this.collectionUnidadeSituacao, "CodigoUnidadeSituacao", this.model.CodigoUnidadeSituacao);
        // this.model.CodigoUnidadeTipo = this.getObjectByValue(this.collectionMunicipios, "CodigoUnidadeTipo", this.model.CodigoUnidadeTipo);
        // Municipios
        this.sendRequest('spCarregaMunicipios', {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
        }, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
            _this.collectionMunicipiofilted = _this.getObjectByValue(_this.collectionMunicipios, "CodigoBaseMunicipio", _this.model.CodigoBaseMunicipio);
            _this.model.Municipios = _this.collectionMunicipiofilted[0];
        });
        this.collectionUnidadeTipoFilted = this.getObjectByValue(this.collectionUnidadeTipo, "CodigoUnidadeTipo", this.model.CodigoUnidadeTipo);
        this.model.UnidadeTipo = this.collectionUnidadeTipoFilted[0];
        this.collectionUnidadeSituacaoFilted = this.getObjectByValue(this.collectionUnidadeSituacao, "CodigoUnidadeSituacao", this.model.CodigoUnidadeSituacao);
        this.model.UnidadeSituacao = this.collectionUnidadeSituacaoFilted[0];
    };
    UnidadesPage.prototype.Select = function (modelAttr, pField) {
        this.model[modelAttr] = pField;
    };
    UnidadesPage.prototype.isPortrait = function () {
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
    /*
    search() {
      // Obtendo a informação do banco de dados
      if (this.modelPesquisa.CnpjCpf
        || this.modelPesquisa.NomeSocial
        || this.modelPesquisa.NomeFantasia
        || this.modelPesquisa.IE
      ) {
        const params = {
          StatusCRUD: 'QUERY',
          formValues: {
            NomeSocial: this.modelPesquisa.NomeSocial,
            NomeFantasia: this.modelPesquisa.NomeFantasia,
            CnpjCpf: this.modelPesquisa.CnpjCpf,
            IE: this.modelPesquisa.IE,
            pageNumber: 1,
            rowspPage: 4
          }
        };
        this.sendRequest('spUnidades', params, (resultado) => {
          this.collection = JSON.parse(atob(resultado.results));
          this.collectionFilter = this.collection;
          this.RecordCount = this.collectionFilter[0].RecordCount;
          this.showPages(this.PageNumber, this.RowsPage);
        });
      } else {
        this.txtCnpjCpf.setFocus();
      }
    }
    */
    UnidadesPage.prototype.goBack = function () {
        if (this.flagForm) {
            // Se o formulario está ativo, então altera a flagForm para que mostre a lista
            this.flagForm = false;
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
    UnidadesPage.prototype.FormClose = function () {
        this.flagForm = false;
    };
    UnidadesPage.prototype.formatMask = function (fieldName, Value, type) {
        this.model[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    UnidadesPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    UnidadesPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.NomeSocial.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.NomeFantasia.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.CnpjCpf.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.CpfRespEmpresa.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    UnidadesPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    UnidadesPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    UnidadesPage.prototype.mostrarPop = function (ev) {
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
    UnidadesPage.prototype.carregarSelectMunicipio = function (value) {
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
    UnidadesPage.prototype.selectChange = function (event, modelAttr) {
        this.model[modelAttr] = event.value[modelAttr];
        // console.log('select:', event.value);
    };
    UnidadesPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    UnidadesPage.prototype.showPages = function (pPageNumber, pRowsPage) {
        this.Paginas = [];
        for (var i = pPageNumber; i < pRowsPage; i++) {
            this.Paginas.push({
                PageNumber: i
            });
        }
    };
    UnidadesPage.prototype.selecionaPagina = function (numero) {
        if (numero < 100) {
            if ((numero + this.RowsPageDef) < this.RecordCount) {
                if ((numero > 0) || (this.PageNumber > 1)) {
                    this.PageNumber = numero - 1;
                }
                if (this.RecordCount > numero + this.RowsPageDef) {
                    this.PageNumber = numero;
                    this.RowsPage = numero + this.RowsPageDef;
                }
            }
            else {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
        }
        else if (numero === 1000) {
            this.PageNumber = 1;
            this.RowsPage = (this.RowsPageDef + 1);
        }
        else if (numero === 1001) {
            if (this.PageNumber <= (this.RowsPageDef + 1)) {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
            else {
                this.PageNumber = this.PageNumber - this.RowsPageDef;
                this.RowsPage = this.PageNumber + this.RowsPageDef;
            }
        }
        else if (numero === 1002) {
            if (this.PageNumber + this.RowsPageDef >= this.RecordCount) {
                this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
                this.RowsPage = this.RecordCount + 1;
            }
            else {
                this.PageNumber = this.PageNumber + this.RowsPageDef;
                this.RowsPage = this.RowsPage + this.RowsPageDef;
            }
        }
        else if (numero === 1003) {
            this.RowsPage = this.RecordCount + 1;
            this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
        }
        this.read(this.PageNumber, this.RowsPageDef);
        // console.log('Número:' + numero + ', Página:' + this.PageNumber + ', Linha:' + this.RowsPage)
    };
    tslib_1.__decorate([
        ViewChild('txtCnpjCpf'),
        tslib_1.__metadata("design:type", Object)
    ], UnidadesPage.prototype, "txtCnpjCpf", void 0);
    UnidadesPage = tslib_1.__decorate([
        Component({
            selector: 'app-unidades',
            templateUrl: './unidades.page.html',
            styleUrls: ['./unidades.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router,
            Platform])
    ], UnidadesPage);
    return UnidadesPage;
}());
export { UnidadesPage };
//# sourceMappingURL=unidades.page.js.map