import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../environments/environment.prod';
var MenuconfigPage = /** @class */ (function () {
    function MenuconfigPage(navCtrl, 
    // public ev: Events,
    alertService, Authorizer) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.flagMenuList = true;
        this.AppName = environment.AppNameSigla + ' | Configurações';
    }
    MenuconfigPage.prototype.CarragaMenuConfigAPI = function () {
        var _this = this;
        var params = {
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            CodigoMenuSistemaPai: this.Authorizer.CodigoMenuPai,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spCarregaMenuConfig', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.itemsMenu = JSON.parse(atob(resultado.results));
                    _this.items = JSON.parse(atob(resultado.results));
                    _this.flagMenuList = _this.items[0].MenuList;
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
    MenuconfigPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.items = this.itemsMenu;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.items = this.items.filter(function (item) {
                return ((item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Details.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    MenuconfigPage.prototype.itemSelected = function (item) {
        // this.alertService.showLoader("Acessando...: " + item.Name,1000);
        this.CarragaMenuConfigAPI();
        this.Authorizer.formTitle = item.Name;
        this.Authorizer.formSubTitle = item.Details;
        this.navCtrl.navigateRoot(item.Route);
    };
    MenuconfigPage.prototype.ngOnInit = function () {
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
    };
    MenuconfigPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidEnter");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuConfigAPI();
        }
    };
    MenuconfigPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuConfigAPI();
        }
    };
    MenuconfigPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MenuconfigPage = tslib_1.__decorate([
        Component({
            selector: 'app-menuconfig',
            templateUrl: './menuconfig.page.html',
            styleUrls: ['./menuconfig.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService])
    ], MenuconfigPage);
    return MenuconfigPage;
}());
export { MenuconfigPage };
//# sourceMappingURL=menuconfig.page.js.map