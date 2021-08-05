import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
// import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { ConsultaInfracaoModalPage } from '../consultaInfracaomodal/consultainfracaomodal.page';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
var ConsultaInfracaoPage = /** @class */ (function () {
    function ConsultaInfracaoPage(navCtrl, alertService, env, Authorizer, modalController, router) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.modalController = modalController;
        this.router = router;
        this.AppName = environment.AppName;
        this.subtitle = 'Consulta de infrações';
        this.QuantidadeInfracoesResult = 0;
        this.InfracoesOriginal = [{
                NumeroAuto: 'XXXXXXXX',
                Placa: 'XXX-XXXX'
            }];
        this.Infracoes = [{
                NumeroAuto: 'XXXXXXXX',
                Placa: 'XXX-XXXX'
            }];
        this.Segmentos = [{
                id: 0,
                segmento: 'Todos'
            }];
        this.SegGruposPadrao = [{
                CODIGO: 0,
                GRUPO: 0,
                SEGMENTO: 'Todos',
                NOME: 'Todos',
                COMANDO: ''
            }];
        this.SegGrupos = [{
                CODIGO: 0,
                GRUPO: 0,
                SEGMENTO: 'Todos',
                NOME: 'Todos',
                COMANDO: ''
            }];
        this.UsersGrupoPadrao = [{
                CODIGO: 0,
                USUARIO: 'Todos'
            }];
        this.UsersGrupo = [{
                CODIGO: 0,
                USUARIO: 'Todos'
            }];
        this.sysos = [
            {
                id: 1,
                nome: 'Android'
            },
            {
                id: 2,
                nome: 'IOS'
            }
        ];
        this.dataReturned = 'Dados';
        this.collectionSegmentos = [{
                CodigoSegmento: '',
                Nome: ''
            }];
        this.collectionGrupos = [{
                CodigoGrupo: '',
                CodigoSegmento: '',
                Grupo: ''
            }];
        this.collectionUsuarios = [{
                CodigoUsuario: '',
                Nome: '',
                Sobrenome: ''
            }];
        this.collectionUfs = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionMunicipios = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0,
                Nome: ''
            }];
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
    }
    ConsultaInfracaoPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
    };
    ConsultaInfracaoPage.prototype.reciverFeedback = function (respostaFilho) {
        // console.log(('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
    };
    ConsultaInfracaoPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.
    };
    ConsultaInfracaoPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
        else {
            this.CarragaSegmentos();
            this.consultarUFs();
        }
    };
    ConsultaInfracaoPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        // console.log(("ionViewWillLeave");
    };
    ConsultaInfracaoPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    };
    ConsultaInfracaoPage.prototype.getPermissoesModulo = function () {
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
    ConsultaInfracaoPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                || (procedure === 'spSegmentos')
                || (procedure === 'spCarregaGrupos')
                || (procedure === 'spCarregaUFs')
                || (procedure === 'spCarregaMunicipios')
                || (procedure === 'spUsuariosPorGrupo')) {
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
    ConsultaInfracaoPage.prototype.CarregaSegmentoGrupoUsuarios = function (form, event) {
        var _this = this;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoGrupo: event.target.value }
        };
        this.sendRequest('spUsuariosPorGrupo', params, function (resultado) {
            _this.collectionUsuarios = JSON.parse(atob(resultado.results));
        });
    };
    ConsultaInfracaoPage.prototype.CarregaInfracoesUsuario = function (form, event) {
        var _this = this;
        var params = {
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            Hashkey: this.Authorizer.HashKey,
            Segmento: form.value.Segmento,
            Grupo: form.value.Grupo,
            CodigoUsuarioInfracao: form.value.CodigoUsuarioInfracao,
            NumeroAIT: form.value.NumeroAIT,
            PlacaVeiculo: form.value.PlacaVeiculo,
            DataInicial: form.value.DataInicial,
            DataFinal: form.value.DataFinal,
            HoraInicial: form.value.HoraInicial,
            HoraFinal: form.value.HoraFinal,
            UF: form.value.UF,
            Municipio: form.value.Municipio
        };
        this.Authorizer.QueryStoreProc('Executar', 'spCarregainfracoes', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.alertService.showLoader(resultado.message, 1000);
                    _this.InfracoesOriginal = JSON.parse(atob(resultado.results));
                    _this.Infracoes = _this.InfracoesOriginal;
                    _this.QuantidadeInfracoesResult = _this.Infracoes.length;
                }
                else {
                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: _this.AppName, pMessage: resultado.message });
                    _this.navCtrl.navigateRoot('/login');
                }
            }
            catch (err) {
                _this.alertService.presentAlert({ pTitle: _this.AppName, pSubtitle: 'Minha Conta', pMessage: resultado.message });
                _this.navCtrl.navigateRoot('/login');
            }
        });
    };
    ConsultaInfracaoPage.prototype.NewInfracoesUsuario = function () {
        this.Infracoes = [
            {
                NumeroAuto: 'XXXXXXXX',
                Placa: 'XXX-XXXX'
            }
        ];
        this.QuantidadeInfracoesResult = 0;
    };
    ConsultaInfracaoPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.Infracoes = this.InfracoesOriginal;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.Infracoes = this.Infracoes.filter(function (item) {
                return ((item.NumeroAuto.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.DataInfracao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.HoraInfracao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Desdobramento.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Local.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Enquadramento.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Usuario.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Placa.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    ConsultaInfracaoPage.prototype.Pesquisar = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ConsultaInfracaoModalPage,
                            componentProps: params
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConsultaInfracaoPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ConsultaInfracaoPage.prototype.carregarSelectGrupo = function (option) {
        var _this = this;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoSegmento: option.target.value }
        };
        this.sendRequest('spCarregaGrupos', params, function (resultado) {
            _this.collectionGrupos = JSON.parse(atob(resultado.results));
        });
    };
    ConsultaInfracaoPage.prototype.CarragaSegmentos = function () {
        var _this = this;
        // Segmentos
        this.sendRequest('spSegmentos', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionSegmentos = JSON.parse(atob(resultado.results));
        });
    };
    ConsultaInfracaoPage.prototype.consultarUFs = function () {
        var _this = this;
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUfs = JSON.parse(atob(resultado.results));
        });
    };
    ConsultaInfracaoPage.prototype.carregarSelectMunicipio = function (option) {
        var _this = this;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: option.target.value }
        };
        this.sendRequest('spCarregaMunicipios', params, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
    };
    ConsultaInfracaoPage = tslib_1.__decorate([
        Component({
            selector: 'app-consultainfracao',
            templateUrl: './consultainfracao.page.html',
            styleUrls: ['./consultainfracao.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            ModalController,
            Router])
    ], ConsultaInfracaoPage);
    return ConsultaInfracaoPage;
}());
export { ConsultaInfracaoPage };
//# sourceMappingURL=consultainfracao.page.js.map