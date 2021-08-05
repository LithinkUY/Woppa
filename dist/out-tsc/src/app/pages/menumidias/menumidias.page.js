import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../environments/environment.prod';
var MenumidiasPage = /** @class */ (function () {
    function MenumidiasPage(navCtrl, 
    // public ev: Events,
    alertService, Authorizer) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.flagMenuList = true;
        this.AppName = environment.AppNameSigla + ' | Multmídias';
    }
    MenumidiasPage.prototype.CarragaMenuAPI = function () {
        var _this = this;
        var params = {
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            CodigoMenuSistemaPai: this.Authorizer.CodigoMenuPai,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spCarregaMenuMidia', params).then(function (res) {
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
    MenumidiasPage.prototype.getItems = function (ev) {
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
    MenumidiasPage.prototype.itemSelected = function (item) {
        // this.alertService.showLoader("Acessando...: " + item.Name,1000);
        this.CarragaMenuAPI();
        this.Authorizer.formTitle = item.Name;
        this.Authorizer.formSubTitle = item.Details;
        this.navCtrl.navigateRoot(item.Route);
    };
    MenumidiasPage.prototype.ngOnInit = function () {
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
    };
    MenumidiasPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidEnter");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuAPI();
        }
    };
    MenumidiasPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuAPI();
        }
    };
    MenumidiasPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MenumidiasPage = tslib_1.__decorate([
        Component({
            selector: 'app-menumidias',
            templateUrl: './menumidias.page.html',
            styleUrls: ['./menumidias.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService])
    ], MenumidiasPage);
    return MenumidiasPage;
}());
export { MenumidiasPage };
//# sourceMappingURL=menumidias.page.js.map