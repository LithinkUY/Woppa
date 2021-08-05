import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { environment } from "../../../environments/environment.prod";
import { Storage } from '@ionic/storage';
var SplashPage = /** @class */ (function () {
    function SplashPage(nav, modalCtrl, db, navCtrl, alertService, Authorizer) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.logoCliente = environment.logoCliente;
        this.logoApp = environment.logoApp;
        this.appVersion = environment.AppVersion;
    }
    SplashPage.prototype.ngOnInit = function () {
        /*
        setTimeout(() => {
          this.closeModal();
        }, 4000);
        */
        var _this = this;
        this.db.get('LSU').then(function (LSU) {
            var SU = JSON.parse(atob(LSU));
            // this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
            // this.NomeUsuarioSistema = SU[0].Nome;
            console.log('Olá, ' + SU[0].Nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');
            _this.Authorizer.CodigoUsuarioSistema = SU[0].CodigoUsuario;
            _this.Authorizer.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
            _this.Authorizer.NomeUsuarioSistema = SU[0].Nome;
            _this.Authorizer.Matricula = SU[0].Matricula;
        });
        this.db.get('HKEY').then(function (HKEY) {
            _this.Authorizer.HashKey = HKEY;
            _this.delay(1000);
            _this.Authorizer.consultarPermisoes();
            _this.navCtrl.navigateForward('/menu/options/tabs/main');
        });
    };
    SplashPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    SplashPage.prototype.delay = function (ms) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ms); }).then(function () {
                            return; // console.log(('fired');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SplashPage.prototype.sleep = function (time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    };
    SplashPage = tslib_1.__decorate([
        Component({
            selector: 'app-splash',
            templateUrl: './splash.page.html',
            styleUrls: ['./splash.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController,
            Storage,
            NavController,
            AlertService,
            AuthService])
    ], SplashPage);
    return SplashPage;
}());
export { SplashPage };
//# sourceMappingURL=splash.page.js.map