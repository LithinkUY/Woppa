import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController, ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Camera } from '@ionic-native/camera/ngx';
import fixOrientation from 'fix-orientation';
import { environment } from '../../../environments/environment.prod';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
// import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, alertService, Authorizer, env, popoverController, router, camera, actionSheetController) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.images = [];
        this.imageData = [];
        this.SrcPhotoAvatar = environment.iconAvatarUsuarioDefault;
        this.model = new Usuario;
        this.title = environment.AppNameSigla + ' | Criar Conta';
        this.subtitle = 'Formuário de Inscrição';
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.flagFiltroAvanzado = false;
        this.flagForm = false;
        this.collection = [];
        this.modelPesquisa = new Usuario;
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
        this.RowsPageDef = 4;
        this.PageNumber = 1;
        this.RowsPage = 5;
        this.Paginas = [];
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
    }
    RegisterPage.prototype.displayCard = function () {
        return this.Foto !== '';
    };
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidEnter");
        var _this = this;
        var imgResult = this.imgResult.nativeElement;
        imgResult.src = this.SrcPhotoAvatar;
        // MY BIT
        var element = this.cameraInput.nativeElement;
        element.onchange = function () {
            // Depois colocar um loading aqui!!!
            var reader = new FileReader();
            reader.onload = function (r) {
                // THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
                // THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
                // UP TO YOU, NOT REALLY BOTHERED
                var base64 = r.target.result;
                // FIXING ORIENTATION USING NPM PLUGIN fix-orientation
                fixOrientation(base64, { image: true }, function (fixed, image) {
                    // fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
                    _this.Foto = fixed;
                    // this.alertService.hideLoader(500);
                });
            };
            reader.readAsDataURL(element.files[0]);
        };
    };
    RegisterPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.
        // console.log(("ionViewWillLeave");
    };
    RegisterPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    };
    RegisterPage.prototype.salvar = function (form) {
        var _this = this;
        // Salvando a informação no banco de dados
        var params = {
            StatusCRUD: 'CREATE',
            formValues: this.model,
        };
        this.sendRequest('spMinhaConta', params, function (resultado) {
            _this.collection.push(JSON.parse(atob(resultado.results))[0]);
            _this.collectionFilter = _this.collection;
            _this.resetModel();
            _this.flagForm = !(_this.flagForm);
        });
    };
    /**
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    RegisterPage.prototype.sendRequest = function (procedure, params, next) {
        var _this = this;
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
                    if (procedure === 'spMinhaConta') {
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
    };
    RegisterPage.prototype.goBack = function () {
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
    RegisterPage.prototype.formatMask = function (fieldName, Value, type) {
        this.model[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    RegisterPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    RegisterPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    RegisterPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    RegisterPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    RegisterPage.prototype.toUppercase = function (e) {
        e.target.value = e.target.value.toUpperCase();
    };
    RegisterPage.prototype.takePicture = function (sourceType) {
        var element = this.cameraInput.nativeElement;
        element.click();
    };
    RegisterPage.prototype.selectImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Selecionar fonte da imagem',
                            buttons: [{
                                    text: 'Carregar da biblioteca de Imagens',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                },
                                {
                                    text: 'Use a Camera',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                                    }
                                },
                                {
                                    text: 'Desistir',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('Nome'),
        tslib_1.__metadata("design:type", Object)
    ], RegisterPage.prototype, "iNome", void 0);
    tslib_1.__decorate([
        ViewChild('inputcamera'),
        tslib_1.__metadata("design:type", ElementRef)
    ], RegisterPage.prototype, "cameraInput", void 0);
    tslib_1.__decorate([
        ViewChild('imgresult'),
        tslib_1.__metadata("design:type", ElementRef)
    ], RegisterPage.prototype, "imgResult", void 0);
    tslib_1.__decorate([
        ViewChild('txtCpfCnpj'),
        tslib_1.__metadata("design:type", Object)
    ], RegisterPage.prototype, "txtCpfCnpj", void 0);
    tslib_1.__decorate([
        ViewChild('txtNome'),
        tslib_1.__metadata("design:type", Object)
    ], RegisterPage.prototype, "txtNome", void 0);
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router,
            Camera,
            ActionSheetController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map