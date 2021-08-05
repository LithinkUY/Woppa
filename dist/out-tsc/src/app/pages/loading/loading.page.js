import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var LoadingPage = /** @class */ (function () {
    function LoadingPage(nav, modalCtrl, db, navCtrl, alertService, Authorizer) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
    }
    LoadingPage.prototype.ngOnInit = function () {
        var _this = this;
        // this.alertService.showLoader('Aguarde... Carregando.')
        this.alertService.presentToast('Processando...');
        this.db.get('LSU').then(function (LSU) {
            if (LSU) {
                var SU = JSON.parse(atob(LSU));
                // this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
                // this.NomeUsuarioSistema = SU[0].Nome;
                // console.log('Olá, ' + SU[0].Nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');
                _this.Authorizer.CodigoUsuarioSistema = SU[0].CodigoUsuario;
                _this.Authorizer.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
                _this.Authorizer.NomeUsuarioSistema = SU[0].Nome + ' ' + SU[0].SobreNome;
                _this.Authorizer.Matricula = SU[0].Matricula;
            }
        });
        this.db.get('HKEY').then(function (HKEY) {
            if (HKEY) {
                _this.Authorizer.HashKey = HKEY;
                _this.delay(1000);
                _this.Authorizer.consultarPermisoes();
                _this.navCtrl.navigateForward('/menu/options/tabs/main');
            }
            else {
                _this.navCtrl.navigateForward('login');
            }
        });
    };
    LoadingPage.prototype.delay = function (ms) {
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
    LoadingPage.prototype.sleep = function (time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
    };
    LoadingPage = tslib_1.__decorate([
        Component({
            selector: 'app-loading',
            templateUrl: './loading.page.html',
            styleUrls: ['./loading.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController,
            Storage,
            NavController,
            AlertService,
            AuthService])
    ], LoadingPage);
    return LoadingPage;
}());
export { LoadingPage };
//# sourceMappingURL=loading.page.js.map