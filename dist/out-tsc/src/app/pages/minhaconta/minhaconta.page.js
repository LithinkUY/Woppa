import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NavController, Events, ModalController, } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import fixOrientation from 'fix-orientation';
import { environment } from '../../../environments/environment.prod';
import { Usuario } from 'src/app/models/usuario';
var STORAGE_KEY = 'my_images';
var MinhaContaPage = /** @class */ (function () {
    function MinhaContaPage(navCtrl, alertService, env, Authorizer, Eventos, modalController, platform, http, webview, camera, actionSheetController, toastController, storage, plt, loadingController, ref) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.Eventos = Eventos;
        this.modalController = modalController;
        this.platform = platform;
        this.http = http;
        this.webview = webview;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.images = [];
        this.imageData = [];
        this.model = new Usuario;
        this.SrcPhotoAvatar = environment.iconAvatarUsuarioDefault;
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
    }
    MinhaContaPage.prototype.displayCard = function () {
        return this.Foto !== '';
    };
    MinhaContaPage.prototype.ngOnInit = function () {
        this.title = this.Authorizer.formTitle;
        this.subtitle = this.Authorizer.formSubTitle;
    };
    /*
    ionViewDidLoad() {
      //console.log(("Passou")
    };
    */
    MinhaContaPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.
        // console.log(("ionViewWillEnter");
        // this.CRUDActionAPIForm('Pesquisando', null);
    };
    MinhaContaPage.prototype.ionViewDidEnter = function () {
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
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
        else {
            this.MostraDados(this.Authorizer.CodigoUsuarioSistema);
        }
    };
    MinhaContaPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.
    };
    MinhaContaPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    };
    MinhaContaPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MinhaContaPage.prototype.MostraDados = function (CodigoUsuario) {
        var _this = this;
        // paramStatus: Pesquisando, Editando, Deletando
        var params = {
            StatusCRUD: 'Pesquisar',
            formValues: '',
            CodigoUsuarioSistema: CodigoUsuario,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spMinhaConta', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    var results = JSON.parse(atob(resultado.results))[0];
                    _this.Nome = results.Nome;
                    _this.SobreNome = results.SobreNome;
                    _this.Email = results.Email;
                    _this.Celular = results.Celular;
                    _this.IMEI = results.IMEI;
                    _this.alertService.showLoader(resultado.message, 1000);
                }
                else {
                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
                    // this.navCtrl.navigateRoot('/login');
                    _this.navCtrl.back();
                }
            }
            catch (err) {
                _this.alertService.presentAlert({
                    pTitle: environment.AppNameSigla,
                    pSubtitle: 'Minha Conta',
                    pMessage: 'Nenhum usuário!'
                });
            }
        });
    };
    MinhaContaPage.prototype.GravarDados = function (form) {
        var _this = this;
        // paramStatus: Pesquisar, Gravar, Deletar
        form.value.Senha = Md5.hashStr(form.value.Senha);
        form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
        // form.value.foto    = this.img; 
        var params = {
            StatusCRUD: 'Gravar',
            formValues: form.value,
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spMinhaConta', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    var results = JSON.parse(atob(resultado.results))[0];
                    _this.Nome = results.Nome;
                    _this.SobreNome = results.SobreNome;
                    _this.Email = results.Email;
                    _this.Celular = results.Celular;
                    _this.IMEI = results.IMEI;
                    _this.alertService.showLoader(resultado.message, 1000);
                }
                else {
                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
                    // this.navCtrl.navigateRoot('/login');
                }
            }
            catch (err) {
                _this.alertService.presentAlert({
                    pTitle: environment.AppNameSigla,
                    pSubtitle: 'Minha Conta',
                    pMessage: 'Nenhum usuário!'
                });
            }
        });
    };
    MinhaContaPage.prototype.toUppercase = function (e) {
        e.target.value = e.target.value.toUpperCase();
    };
    MinhaContaPage.prototype.formatMask = function (fieldName, form, type) {
        var field = this.env.formatMask(form.value[fieldName], type);
        form.value[fieldName] = field;
        // console.log(value);
    };
    /*
      loadStoredImages() {
        this.storage.get(STORAGE_KEY).then(images => {
          if (images) {
            let arr = JSON.parse(images);
            this.images = [];
            for (let img of arr) {
              let filePath = this.file.dataDirectory + img;
              let resPath = this.pathForImage(filePath);
              this.images.push({ name: img, path: resPath, filePath: filePath });
            }
          }
        });
      }
    
      pathForImage(img) {
        if (img === null) {
          return '';
        } else {
          let converted = this.webview.convertFileSrc(img);
          return converted;
        }
      }
    
      async presentToast(text) {
        const toast = await this.toastController.create({
          message: text,
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      }
    
      */
    MinhaContaPage.prototype.takePicture = function (sourceType) {
        var element = this.cameraInput.nativeElement;
        element.click();
    };
    MinhaContaPage.prototype.selectImage = function () {
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
    ], MinhaContaPage.prototype, "iNome", void 0);
    tslib_1.__decorate([
        ViewChild('inputcamera'),
        tslib_1.__metadata("design:type", ElementRef)
    ], MinhaContaPage.prototype, "cameraInput", void 0);
    tslib_1.__decorate([
        ViewChild('imgresult'),
        tslib_1.__metadata("design:type", ElementRef)
    ], MinhaContaPage.prototype, "imgResult", void 0);
    MinhaContaPage = tslib_1.__decorate([
        Component({
            selector: 'app-minhaconta',
            templateUrl: './minhaconta.page.html',
            styleUrls: ['./minhaconta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            Events,
            ModalController,
            Platform,
            HttpClient,
            WebView,
            Camera,
            ActionSheetController,
            ToastController,
            Storage,
            Platform,
            LoadingController,
            ChangeDetectorRef])
    ], MinhaContaPage);
    return MinhaContaPage;
}());
export { MinhaContaPage };
//# sourceMappingURL=minhaconta.page.js.map