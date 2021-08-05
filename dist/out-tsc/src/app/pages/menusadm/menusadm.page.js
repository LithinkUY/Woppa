import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Menus } from 'src/app/models/menus';
var MenusadmPage = /** @class */ (function () {
    function MenusadmPage(navCtrl, alertService, Authorizer, env, popoverController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.AppName = environment.AppNameSigla;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = this.Authorizer.formSubTitle; // 'Usuário';
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.flagFiltroAvanzado = false;
        this.RowsPageDef = 100;
        this.PageNumber = 1;
        this.RowsPage = 5;
        this.Paginas = [];
        this.flagForm = false;
        this.collection = [];
        this.model = new Menus;
        this.modelPesquisa = new Menus;
        this.collectionSegmentos = [{
                CodigoSegmento: '',
                Nome: ''
            }];
        this.collectionGrupos = [{
                CodigoGrupo: '',
                CodigoSegmento: '',
                Grupo: ''
            }];
        this.collectionMenuGrupos = [{
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
    MenusadmPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        this.read(1, this.RowsPageDef);
        this.CarregaMenuGrupos();
    };
    MenusadmPage.prototype.CarregaMenuGrupos = function () {
        var _this = this;
        this.sendRequest('spMenuGrupos', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionMenuGrupos = JSON.parse(atob(resultado.results));
        });
    };
    MenusadmPage.prototype.getPermissoesModulo = function () {
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
    MenusadmPage.prototype.sendRequest = function (procedure, params, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var paramsSend;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (typeof this.Authorizer.HashKey !== 'undefined') {
                    if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                        || ((params.StatusCRUD === 'QUERY') && (this.permissoes.Pesquisar > 0))
                        || (procedure === 'spMenuGrupos')
                    /*
                    || (procedure === 'spSegmentos')
                    || (procedure === 'spCarregaGrupos')
                    */
                    ) {
                        paramsSend = {
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
                                    if (procedure === 'spMenusAdm') {
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
                return [2 /*return*/];
            });
        });
    };
    MenusadmPage.prototype.search = function () {
        var _this = this;
        // Obtendo a informação do banco de dados
        if (this.txtNomeMorador.value || this.txtRamal.value) {
            var params = {
                StatusCRUD: 'QUERY',
                formValues: {
                    NomeMorador: this.txtNomeMorador.value,
                    Ramal: this.txtRamal.value,
                    pageNumber: 1,
                    rowspPage: 4
                }
            };
            this.sendRequest('spMenusAdm', params, function (resultado) {
                _this.collection = JSON.parse(atob(resultado.results));
                _this.collectionFilter = _this.collection;
                _this.RecordCount = _this.collectionFilter[0].RecordCount;
                _this.showPages(_this.PageNumber, _this.RowsPage);
            });
        }
        else {
            this.txtRamal.setFocus();
        }
    };
    MenusadmPage.prototype.salvar = function (form) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                params = {
                    StatusCRUD: this.model.CodigoMenuSistema > 0 ? 'UPDATE' : 'CREATE',
                    formValues: this.model,
                };
                this.sendRequest('spMenusAdm', params, function (resultado) {
                    if (params.StatusCRUD === 'CREATE') {
                        _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                        _this.collectionFilter = _this.collection;
                    }
                    else if (params.StatusCRUD === 'UPDATE') {
                        _this.collectionFilter = _this.collection.map(function (item, index) {
                            if (item.CodigoMenuSistema === _this.model.CodigoMenuSistema) {
                                item = JSON.parse(atob(resultado.results))[0];
                            }
                            return item;
                        });
                        _this.collection = _this.collectionFilter;
                    }
                    _this.resetModel();
                    _this.flagForm = !(_this.flagForm);
                });
                return [2 /*return*/];
            });
        });
    };
    MenusadmPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "<strong> " + model.Name + "</strong>!!!";
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
                    _this.sendRequest('spMenusAdm', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoMenuSistema === this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoMorador);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    MenusadmPage.prototype.read = function (pPageNumber, pRowsPage) {
        var _this = this;
        // Obtendo a informação do banco de dados    
        var params = {
            StatusCRUD: 'READ',
            formValues: {
                pageNumber: pPageNumber,
                rowspPage: pRowsPage
            }
        };
        this.sendRequest('spMenusAdm', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
            _this.RecordCount = _this.collectionFilter[0].RecordCount;
            _this.showPages(_this.PageNumber, _this.RowsPage);
            // this.modelPesquisa.Pagina = this.paginas[0];
        });
    };
    MenusadmPage.prototype.edit = function (model) {
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
        /*
        this.sendRequest('spCarregaMunicipios', {
          StatusCRUD: 'READ',
          formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
        }, (resultado) => {
          this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
        */
    };
    MenusadmPage.prototype.goBack = function () {
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
    MenusadmPage.prototype.formatMask = function (fieldName, Value, type) {
        this.model[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    MenusadmPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    MenusadmPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    // (item.MenuGrupo.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Details.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    MenusadmPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    MenusadmPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    MenusadmPage.prototype.mostrarPop = function (ev) {
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
    MenusadmPage.prototype.carregarSelectGrupo = function (option) {
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
    /*
    public carregarSelectMunicipio( value: any) {
      this.model.CodigoBaseUF = value;
      // this.model.CodigoMunicipio = 0;
  
      const params = {
        StatusCRUD: 'READ',
        formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
      };
  
      this.sendRequest('spCarregaMunicipios', params, (resultado) => {
        this.collectionMunicipios = JSON.parse(atob(resultado.results));
      });
    }
    */
    /*
    private CallPhone( PhoneNumber: string) {
   
     this.callNumber.callNumber(PhoneNumber, true).then(
       res => console.log('Launched dialer!', res))
     .catch(
       err => console.log('Error launching dialer', err));
    }
    */
    MenusadmPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    /*
    public showPagination() {
      let tot: number;
      let pag: number;
      tot = this.collection[0].total;
  
      pag = tot / this.modelPesquisa.RowspPage;
      if (pag < 1) {
        pag = 1;
      }
  
      for (let i = 0; i < pag; i++) {
        let num: number;
        num = i + 1;
  
        if (i === 0) {
          this.paginas  = [
            {
              numero : num,
              nome: 'Página ' + num.toString()
            }
          ];
        } else {
          this.paginas.push( {
            numero : num,
            nome: 'Página ' + num.toString()
          });
        }
      }
      this.modelPesquisa.Pagina = this.paginas[0];
    }
    */
    MenusadmPage.prototype.showPages = function (pPageNumber, pRowsPage) {
        this.Paginas = [];
        for (var i = pPageNumber; i < pRowsPage; i++) {
            this.Paginas.push({
                PageNumber: i
            });
        }
    };
    MenusadmPage.prototype.selecionaPagina = function (numero) {
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
        ViewChild('txtRamal'),
        tslib_1.__metadata("design:type", Object)
    ], MenusadmPage.prototype, "txtRamal", void 0);
    tslib_1.__decorate([
        ViewChild('txtNomeMorador'),
        tslib_1.__metadata("design:type", Object)
    ], MenusadmPage.prototype, "txtNomeMorador", void 0);
    MenusadmPage = tslib_1.__decorate([
        Component({
            selector: 'app-menusadm',
            templateUrl: './menusadm.page.html',
            styleUrls: ['./menusadm.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router])
    ], MenusadmPage);
    return MenusadmPage;
}());
export { MenusadmPage };
//# sourceMappingURL=menusadm.page.js.map