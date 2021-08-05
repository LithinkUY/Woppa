import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
// for install: https://www.npmjs.com/package/ts-md5
import { Md5 } from 'ts-md5/dist/md5';
// Secure Storage
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
// import { Network } from '@ionic-native/network';
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
// import { GooglePlus, GooglePlusOriginal } from '@ionic-native/google-plus';
// import { TwitterConnect } from '@ionic-native/twitter-connect';
// import { GooglePlusOriginal } from '@ionic-native/google-plus';
import { environment } from './../../../environments/environment.prod';
import { Usuario } from 'src/app/models/usuario';
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, 
    // , private modalController: ModalController
    navCtrl, alertService, env, Authorizer, 
    // ,private facebook : Facebook 
    // ,private googlePlus : GooglePlus
    // ,googlePlus: GooglePlusOriginal
    db) {
        //this.isLogin = true;
        // LSU -> LAST SESSION USER
        /*
        this.db.get('LSU').then((LSU) => {
          let SU = JSON.parse(atob(LSU));
          this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
          this.NomeUsuarioSistema = SU[0].Nome;
          ////console.log(('Olá, ' + SU[0].Nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');
        });
        */
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.db = db;
        this.model = new Usuario;
        this.isLogin = true;
        this.AppName = environment.AppName;
        this.logoCliente = environment.logoCliente;
        this.AppLogoApp = environment.logoApp;
        this.appVersion = environment.AppVersion;
        this.password_type = 'password';
    }
    LoginPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Authorizer.ConectionInet()];
                    case 1:
                        _a.sent();
                        this.db.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //// console.log(("ionViewWillEnter");    
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        // //console.log(("ionViewDidEnter");         
        this.iEmail.setFocus();
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        //// console.log(("ionViewWillLeave"); 
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //// console.log(("ionViewDidLeave");
    };
    LoginPage.prototype.backButtonEvent = function () {
        this.platform.backButton.subscribe(function () {
            // console.log( ('exit');
            navigator['app'].exitApp();
        });
    };
    LoginPage.prototype.togglePasswordMode = function () {
        this.password_type = this.password_type === 'text' ? 'password' : 'text';
    };
    LoginPage.prototype.AuthLogin = function (form) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loginResult, Nome, SobreNome;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLogin = false;
                        form.value.Senha = Md5.hashStr(this.model.Senha);
                        this.Authorizer.CpfCnpjEmpresa = form.value.CpfCnpjEmpresa;
                        return [4 /*yield*/, this.Authorizer.iLogin(form)];
                    case 1:
                        loginResult = _a.sent();
                        if (loginResult[0].Sucess === true) {
                            this.isLogin = true;
                            Nome = JSON.parse(atob(loginResult[0].Results))[0].Nome;
                            SobreNome = JSON.parse(atob(loginResult[0].Results))[0].SobreNome;
                            this.Authorizer.NomeUsuarioSistema = Nome + ' ' + SobreNome;
                            this.alertService.showLoader(loginResult[0].Message + ' ' + Nome + ' ' + SobreNome, 2000);
                            this.navCtrl.navigateRoot('/menu/options');
                        }
                        else {
                            this.model.Senha = '';
                            this.alertService.presentAlert({
                                pTitle: 'Controle de Acesso',
                                pSubtitle: 'Olá, Todo mundo erra.',
                                pMessage: loginResult[0].Message
                            });
                            this.iEmail.setFocus();
                            this.isLogin = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.formatMask = function (fieldName, Value, type) {
        this.model[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    tslib_1.__decorate([
        ViewChild('txtEmail'),
        tslib_1.__metadata("design:type", Object)
    ], LoginPage.prototype, "iEmail", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            NavController,
            AlertService,
            EnvService,
            AuthService,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map