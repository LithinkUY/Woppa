import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
var PrincipalPage = /** @class */ (function () {
    function PrincipalPage(navCtrl, alertService, Authorizer, db) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.db = db;
        this.flagMenuList = true;
        this.AppName = environment.AppNameSigla;
        this.title = environment.AppNameSigla + ' | ' + 'Menu Principal';
    }
    PrincipalPage.prototype.CarragaMenuPrincipalAPI = function () {
        var _this = this;
        // paramStatus: Pesquisando, Editando, Deletando
        var params = {
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            CodigoMenuPai: this.Authorizer.CodigoMenuPai,
            CodigoMenuGrupo: this.Authorizer.CodigoMenuGrupoP,
            Hashkey: this.Authorizer.HashKey
        };
        this.Authorizer.QueryStoreProc('Executar', 'spCarregaMenuPrincipal', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    // this.alertService.showLoader(resultado.message,1000);
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
                // resultado.message = ''  
                // this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.AppName, pMessage: resultado.message });
                _this.navCtrl.navigateRoot('/menu/developing');
            }
        });
    };
    /*
    CarregaMenuPrincipalStatic() {
      //this.alertService.showLoader('Carregando... aguarde!!!');
      this.items = [
        {
          id: 1,
          name: "Produtos",
          icon: "assets/gerinfra33/imgs/Produtos.png",
          details: "Procure aqui o que você precisa encontrar.",
          route: "/login"
        }
      ];
      this.items.push({
        id: 2,
        name: Usa "Preços",
        icon: "assets/gerinfra33/imgs/Consultar-Precos.png",
        details: "Consulte os preços de forma rápido usando a camera do seu celular.",
        route: "/login"
      });
      this.items.push({
        id: 4,
        name: "Promoções",
        icon: "assets/gerinfra33/imgs/Promocoes.png",
        details: "Encontre todas as promoções e aproveite.",
        route: "/login"
      });
      this.items.push({
        id: 5,
        name: "Favoritos",
        icon: "assets/gerinfra33/imgs/Compras.png",
        details: "Produtos marcados como favoritos.",
        route: "/login"
      });
      this.items.push({
        id: 6,
        name: "Compras",
        icon: "assets/gerinfra33/imgs/Compras.png",
        details: "Tudo que você colocou no carrinho, salvou ou comprou antes.",
        route: "/login"
      });
      this.items.push({
        id: 6,
        name: "Atendimento",
        icon: "assets/gerinfra33/imgs/Consultar-Precos.png",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route: "/login"
      });
    }
    */
    PrincipalPage.prototype.getItems = function (ev) {
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
    PrincipalPage.prototype.itemSelected = function (item) {
        // this.alertService.showLoader("Acessando...: " + item.Name,1000);
        this.Authorizer.formTitle = item.Name;
        this.Authorizer.formSubTitle = item.Details;
        this.CarragaMenuPrincipalAPI();
        try {
            this.navCtrl.navigateRoot(item.Route);
        }
        catch (err) {
            this.navCtrl.navigateRoot('/menu/developing');
        }
    };
    PrincipalPage.prototype.ngOnInit = function () {
        if (!this.Authorizer.HashKey) {
            // this.navCtrl.navigateRoot('/login');
        }
    };
    PrincipalPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        // console.log(("ionViewDidEnter");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuPrincipalAPI();
        }
    };
    PrincipalPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        // console.log(("ionViewDidLeave");
        if (this.Authorizer.HashKey) {
            this.CarragaMenuPrincipalAPI();
            // this.title = environment.AppNameSigla + ' | Menu - Principal';
            // this.subtitle = 'Menu Principal';
        }
    };
    PrincipalPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    PrincipalPage = tslib_1.__decorate([
        Component({
            selector: 'app-principal',
            templateUrl: './principal.page.html',
            styleUrls: ['./principal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            AuthService,
            Storage])
    ], PrincipalPage);
    return PrincipalPage;
}());
export { PrincipalPage };
//# sourceMappingURL=principal.page.js.map