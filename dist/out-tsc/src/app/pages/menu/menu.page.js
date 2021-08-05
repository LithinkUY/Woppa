import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
// import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { environment } from '../../../environments/environment.prod';
var MenuPage = /** @class */ (function () {
    function MenuPage(plt, 
    // private document: DocumentViewer,
    db, Authorizer, alertService, 
    // private principalPage : PrincipalPage,
    navCtrl, router) {
        var _this = this;
        this.plt = plt;
        this.db = db;
        this.Authorizer = Authorizer;
        this.alertService = alertService;
        this.navCtrl = navCtrl;
        this.router = router;
        this.NumeroTerminal = "000001";
        this.AppName = environment.AppName;
        this.AppVersion = environment.AppVersion;
        this.AppLogoApp = environment.logoApp;
        this.AppEmailSuporte = environment.AppEmailSuporte;
        this.AppWhatAppSuporte = environment.AppWhatAppSuporte;
        this.logoCliente = environment.logoCliente;
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.selectedPath = '';
        this.SideMenu = [];
        this.router.events.subscribe(function (event) {
            if (event && event.url) {
                _this.selectedPath = event.url;
            }
            /*
            plt.ready().then((source) => {
              //console.log(("platform: " + source);
            });
            */
        });
    }
    MenuPage.prototype.itemSelected = function (item) {
        // this.alertService.showLoader("Acessando...: " + item.Name,1000);
        this.Authorizer.CodigoMenuPai = item.CodigoMenuPai;
        this.Authorizer.CodigoMenuGrupoL = item.CodigoMenuGrupo;
        this.Authorizer.formTitle = item.Name;
        this.Authorizer.formSubTitle = item.Details;
        this.navCtrl.navigateRoot(item.Route);
    };
    MenuPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidEnter");
        if (this.Authorizer.HashKey) {
            this.CpfCnpjEmpresa = this.Authorizer.CpfCnpjEmpresa;
            this.CodigoUsuarioSuporte = this.Authorizer.CodigoUsuarioSuporte;
            this.CarragaMenuLateralAPI();
            /*
            this.db.get('LSU').then((LSU) => {
              let SU = JSON.parse(atob(LSU));
              this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
              this.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
              this.NomeUsuarioSistema = SU[0].Nome;
            });
            */
        }
        else {
            // this.navCtrl.navigateRoot('/login');
        }
    };
    MenuPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    };
    MenuPage.prototype.CarragaMenuLateralAPI = function () {
        var _this = this;
        // paramStatus: Pesquisando, Editando, Deletando
        var params = {
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            CodigoMenuGrupo: this.Authorizer.CodigoMenuGrupoL,
            CodigoMenuPai: this.Authorizer.CodigoMenuPai,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spCarregaMenuLateral', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    // this.alertService.showLoader(resultado.message,1000);
                    _this.SideMenu = JSON.parse(atob(resultado.results));
                    _this.NomeUsuarioSistema = _this.Authorizer.NomeUsuarioSistema;
                    _this.Matricula = _this.Authorizer.Matricula;
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
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            Storage,
            AuthService,
            AlertService,
            NavController,
            Router])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map