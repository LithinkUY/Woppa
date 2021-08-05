import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Infracao } from 'src/app/models/infracao';
import { NavController, IonSlide, PopoverController, IonContent, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Router } from '@angular/router';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
var CadastroInfracoesPage = /** @class */ (function () {
    function CadastroInfracoesPage(navCtrl, Authorizer, alertService, env, router, popoverController) {
        this.navCtrl = navCtrl;
        this.Authorizer = Authorizer;
        this.alertService = alertService;
        this.env = env;
        this.router = router;
        this.popoverController = popoverController;
        this.subtitle = 'Cadastro de Infrações';
        // flagForm = true;
        this.flagVeiculo = false;
        this.model = new Infracao();
        this.flagFiltroAvanzado = false;
        this.collectionPaises = [
            { nomePais: 'Brasil' },
            { nomePais: 'Argentina' },
            { nomePais: 'Bolivia' },
            { nomePais: 'Buiana' },
            { nomePais: 'Chile' },
            { nomePais: 'Venezuela' },
            { nomePais: 'Paraguai' },
            { nomePais: 'Uruguai' },
            { nomePais: 'México' },
            { nomePais: 'EUA' },
            { nomePais: 'Canadá' },
            { nomePais: 'Outro' }
        ];
        this.collectionEspecies = [
            { value: 'ESPECIAL', nome: 'ESPECIAL' },
            { value: 'MISTO', nome: 'MISTO' },
            { value: 'PASSAGEIRO', nome: 'PASSAGEIRO' }
        ];
        this.collectionCores = [
            { value: 'BRANCO', nome: 'BRANCO', cor: 'branco' },
            { value: 'PRATA', nome: 'PRATA', cor: 'prata' },
            { value: 'CINZA', nome: 'CINZA', cor: 'cinza' },
            { value: 'PRETO', nome: 'PRETO', cor: 'preto' },
            { value: 'VERMELHA', nome: 'VERMELHA', cor: 'vermelho' },
            { value: 'GRENA', nome: 'GRENÁ', cor: 'grena' },
            { value: 'AZUL', nome: 'AZUL', cor: 'azul' }
        ];
        this.collectionCodicoes = [
            { value: 'PRESENTE', nome: 'PRESENTE' },
            { value: 'AUSENTE', nome: 'AUSENTE' },
            { value: 'EM TRÂNSITO', nome: 'EM TRÂNSITO' },
            { value: 'EVADIU-SE', nome: 'EVADIU-SE' },
            { value: 'RECUSOU A IDENTIFICAR-SE', nome: 'RECUSOU A IDENTIFICAR-SE' },
            { value: 'NÃO IDENTIFICADO', nome: 'NÃO IDENTIFICADO' },
            { value: 'VIDEO MONITORAMENTO', nome: 'VIDEO MONITORAMENTO' }
        ];
        this.collectionCategorias = [
            { value: 'A', nome: 'A' },
            { value: 'B', nome: 'B' },
            { value: 'C', nome: 'C' },
            { value: 'D', nome: 'D' },
            { value: 'E', nome: 'E' }
        ];
        this.collectionTipoDocumento = [
            { value: 'CPF', nome: 'CPF' },
            { value: 'CNH', nome: 'CNH' },
            { value: 'RG', nome: 'RG' },
            { value: 'CTPS', nome: 'CTPS' },
            { value: 'Passaporte', nome: 'Passaporte' },
            { value: 'Outro', nome: 'Outro' }
        ];
        this.permissoes = {
            Route: '',
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0
        }; // Permissoes do modulo para o usuario logado
        this.collectionUfs = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionMunicipios = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0
            }];
        this.collectionMunicipiosInfracao = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0
            }];
        this.slideOpts = {
            initialSlide: 0,
            speed: 400,
            noSwiping: true,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
            on: {
                slideChange: function () {
                    var swiper = this;
                    var title = document.getElementsByClassName('title-form');
                    var array = [
                        '1. Dados do veículo',
                        '2. Dados do condutor',
                        '3. Dados da infração',
                        '4. Aferição',
                        '5. Observações',
                        '6. Enquadramento'
                    ];
                    title[0]['innerText'] = array[swiper.activeIndex];
                }
            }
        };
        this.slider = {
            isBeginningSlide: true,
            isEndSlide: false
        };
    }
    CadastroInfracoesPage.prototype.ngOnInit = function () {
        this.getPermissoesModulo();
        // Uf
        this.consultarOrgao();
        this.consultarAUTO();
        this.consultarUFs();
        this.consultarBairros();
        this.consultarMedicoes();
        this.consultarLeis();
        this.consultarEquipamentosAfericao();
        this.consultarTipoLocais();
        this.inicializarModel();
    };
    CadastroInfracoesPage.prototype.ionViewDidEnter = function () {
    };
    CadastroInfracoesPage.prototype.scrollToTop = function () {
        this.content.scrollToTop(400);
    };
    CadastroInfracoesPage.prototype.slideDidChange = function () {
        this.scrollToTop();
    };
    // Move to Next slide
    CadastroInfracoesPage.prototype.slideNext = function (object, slideView) {
        var _this = this;
        slideView.slideNext(500).then(function () {
            _this.checkIfNavDisabled(object, slideView);
        });
    };
    // Move to previous slide
    CadastroInfracoesPage.prototype.slidePrev = function (object, slideView) {
        var _this = this;
        slideView.slidePrev(500).then(function () {
            _this.checkIfNavDisabled(object, slideView);
            // this.activeIndex = this.activeIndex - 1;
        });
    };
    // Method called when slide is changed by drag or navigation
    CadastroInfracoesPage.prototype.SlideDidChange = function (object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    };
    // Call methods to check if slide is first or last to enable disbale navigation  
    CadastroInfracoesPage.prototype.checkIfNavDisabled = function (object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    };
    CadastroInfracoesPage.prototype.checkisBeginning = function (object, slideView) {
        slideView.isBeginning().then(function (istrue) {
            object.isBeginningSlide = istrue;
            // this.activeIndex = 0;
        });
    };
    CadastroInfracoesPage.prototype.checkisEnd = function (object, slideView) {
        slideView.isEnd().then(function (istrue) {
            object.isEndSlide = istrue;
        });
    };
    CadastroInfracoesPage.prototype.goBack = function () {
        /*if (this.flagForm) {
          // Se o formulario está ativo, então altera a flagForm para que mostre a lista
          this.flagForm = false;
          this.resetModel();
        } else if (this.flagFiltroAvanzado) {
          // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
          this.flagFiltroAvanzado = false;
          this.collectionFilter = this.collection;
        } else {
          this.navCtrl.back();
        }*/
        this.navCtrl.back();
    };
    CadastroInfracoesPage.prototype.changeSelectEquipamento = function (e) {
        var equipamento = this.collectionEquipamentos.filter(function (element) {
            return (element.codigo === parseInt(e.target.value));
        });
        if (equipamento[0].hasOwnProperty('codigo')) {
            this.model.numero_equipamento = equipamento[0].numero;
            this.model.marca_equipamento = equipamento[0].marca;
            this.model.modelo_equipamento = equipamento[0].modelo;
            this.model.tipo_medicao = equipamento[0].tipo_afericao.toString();
        }
    };
    CadastroInfracoesPage.prototype.changeSelectMedicaoRealizada = function (event) {
        console.log(event);
        var obj = this.collectionMedicoes.filter(function (element) {
            if (element.medicao_realizada == event.target.value) {
                return element;
            }
        });
        this.model.medicao_considerada = obj[0]['medicao_considerada'];
    };
    CadastroInfracoesPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    CadastroInfracoesPage.prototype.setColor = function (cor) {
        this.model.cor = cor;
    };
    CadastroInfracoesPage.prototype.carregarSelectMunicipio = function (option) {
        var _this = this;
        this.model.codigoUfVeiculo = option.target.value;
        this.model.codigoMunicipioVeiculo = 0;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: option.target.value }
        };
        this.sendRequest('spCarregaMunicipios', params, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.carregarSelectMunicipioInfracao = function (option) {
        var _this = this;
        this.model.uf_municipio = option.target.value;
        this.model.codigo_municipio = '';
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: option.target.value }
        };
        this.sendRequest('spCarregaMunicipios', params, function (resultado) {
            _this.collectionMunicipiosInfracao = JSON.parse(atob(resultado.results));
        });
    };
    /**
     *  
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    CadastroInfracoesPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                || (procedure === 'spCarregaUFs')
                || (procedure === 'spCarregaMunicipios')
                || (procedure === 'spEquipamentoAfericao')
                || (procedure === 'spTaloes3')
                || (procedure === 'spMedicoes')
                || (procedure === 'spBairros')
                || (procedure === 'spLeis')
                || (procedure === 'spTipoLocais')
            /*
            || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
            || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
            || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
            */
            ) {
                var parametros = {
                    StatusCRUD: params.StatusCRUD,
                    formValues: params.formValues,
                    CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                    Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                };
                console.log(parametros);
                this.Authorizer.QueryStoreProc('Executar', procedure, parametros).then(function (res) {
                    var resultado = res[0];
                    try {
                        if (resultado.success) {
                            next(resultado);
                            if (procedure === 'spUsuarios') {
                                _this.alertService.showLoader(resultado.message, 1000);
                            }
                        }
                        else {
                            _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: _this.subtitle, pMessage: resultado.message });
                            _this.goBack();
                        }
                    }
                    catch (err) {
                        _this.alertService.presentAlert({ pTitle: _this.env.AppNameSigla, pSubtitle: _this.subtitle, pMessage: 'Erro ao fazer a petição' });
                    }
                });
            }
            else {
                this.alertService.presentAlert({
                    pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação '
                });
            }
        }
        else {
            this.goBack();
        }
    };
    CadastroInfracoesPage.prototype.getPermissoesModulo = function () {
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
    CadastroInfracoesPage.prototype.consultarUFs = function () {
        var _this = this;
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUfs = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.consultarMedicoes = function () {
        var _this = this;
        this.sendRequest('spMedicoes', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionMedicoes = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.consultarBairros = function () {
        var _this = this;
        this.sendRequest('spBairros', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionBairros = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.consultarTipoLocais = function () {
        var _this = this;
        this.sendRequest('spTipoLocais', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionTipoLocais = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.consultarLeis = function () {
        var _this = this;
        this.sendRequest('spLeis', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionLeis = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.consultarEquipamentosAfericao = function () {
        var _this = this;
        this.sendRequest('spEquipamentoAfericao', {
            StatusCRUD: 'READ',
            formValues: ''
        }, function (resultado) {
            _this.collectionEquipamentos = JSON.parse(atob(resultado.results));
        });
    };
    CadastroInfracoesPage.prototype.mostrarPop = function (ev) {
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
                                // this.flagForm = false;
                                this.collectionFilter = [];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CadastroInfracoesPage.prototype.consultarAUTO = function () {
        var _this = this;
        var dados = {
            pim: 'gerinfra33',
            imei: 'gerinfra33'
        };
        this.sendRequest('spTaloes3', {
            StatusCRUD: 'READ',
            formValues: dados
        }, function (resultado) {
            var auto = JSON.parse(atob(resultado.results))[0];
            _this.model.auto = auto.serie + auto.proxima.padStart(8, '0');
        });
    };
    CadastroInfracoesPage.prototype.consultarOrgao = function () {
        this.model.orgao = '' + 9999;
    };
    CadastroInfracoesPage.prototype.inicializarModel = function () {
        this.model.pais = 'Brasil';
        this.model.usuario = parseInt(this.Authorizer.CodigoUsuarioSistema);
    };
    CadastroInfracoesPage.prototype.salvar = function (form) {
        var _this = this;
        // Salvando a informação no banco de dados
        this.model.data_infracao = form.value.data_infracao;
        var params = {
            StatusCRUD: this.model.codigo > 0 ? 'UPDATE' : 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spInfracao', params, function (resultado) {
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
            // this.flagForm = !(this.flagForm);
            _this.goBack();
        });
    };
    CadastroInfracoesPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlide)
    ], CadastroInfracoesPage.prototype, "slides", void 0);
    tslib_1.__decorate([
        ViewChild(IonContent),
        tslib_1.__metadata("design:type", IonContent)
    ], CadastroInfracoesPage.prototype, "content", void 0);
    tslib_1.__decorate([
        ViewChild('txtPlaca'),
        tslib_1.__metadata("design:type", IonInput)
    ], CadastroInfracoesPage.prototype, "txtPlaca", void 0);
    CadastroInfracoesPage = tslib_1.__decorate([
        Component({
            selector: 'app-cadastro-infracoes',
            templateUrl: './cadastro-infracoes.page.html',
            styleUrls: ['./cadastro-infracoes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthService,
            AlertService,
            EnvService,
            Router,
            PopoverController])
    ], CadastroInfracoesPage);
    return CadastroInfracoesPage;
}());
export { CadastroInfracoesPage };
//# sourceMappingURL=cadastro-infracoes.page.js.map