import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
//import { IonInfiniteScroll } from '@ionic/angular';
var ConsultaInfracaoModalPage = /** @class */ (function () {
    function ConsultaInfracaoModalPage(nav, modalCtrl, navParams) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
        //dataList:any;
        this.Infracoes = [
            {
                codigo: '1',
                auto: "123"
            }
        ];
        this.InfracoesOriginal = [
            {
                codigo: '1',
                auto: "123"
            }
        ];
        this.Infracoes = JSON.parse(JSON.stringify(this.navParams.data));
        // componentProps can also be accessed at construction time using NavParams
        //console.log((navParams.data);    
        //this.dataList.data = navParams;
        /*
        for (let i = 0; i < 25; i++) {
          this.dataList.push("Devices: "+this.dataList.length);
        }
        */
    }
    ConsultaInfracaoModalPage.prototype.handleInput = function (event) {
        var _this = this;
        var query = event.target.value.toLowerCase();
        requestAnimationFrame(function () {
            _this.Infracoes.forEach(function (item) {
                var shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    };
    ConsultaInfracaoModalPage.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            //console.log(('Done');
            for (var i = 0; i < 10; i++) {
                _this.Infracoes.push("Devices: " + _this.Infracoes.length);
            }
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.Infracoes.length == 1000) {
                event.target.disabled = true;
            }
        }, 500);
    };
    /*
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    */
    ConsultaInfracaoModalPage.prototype.ngOnInit = function () {
    };
    ConsultaInfracaoModalPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //console.log(("ionViewWillEnter");
    };
    ConsultaInfracaoModalPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        //console.log(("ionViewDidEnter");    
    };
    ConsultaInfracaoModalPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        //console.log(("ionViewWillLeave");
    };
    ConsultaInfracaoModalPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //console.log(("ionViewDidLeave");
    };
    ConsultaInfracaoModalPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ConsultaInfracaoModalPage.prototype.clickedSearch = function () {
    };
    ConsultaInfracaoModalPage.prototype.getItems = function (ev) {
        //this.CarregaMenuPrincipalStatic();
        this.Infracoes = this.InfracoesOriginal;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.Infracoes = this.Infracoes.filter(function (item) {
                return ((item.auto.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ConsultaInfracaoModalPage.prototype, "firstName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ConsultaInfracaoModalPage.prototype, "lastName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ConsultaInfracaoModalPage.prototype, "middleInitial", void 0);
    ConsultaInfracaoModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-consultainfracaomodal',
            templateUrl: './consultainfracaomodal.page.html',
            styleUrls: ['./consultainfracaomodal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams])
    ], ConsultaInfracaoModalPage);
    return ConsultaInfracaoModalPage;
}());
export { ConsultaInfracaoModalPage };
//# sourceMappingURL=consultainfracaomodal.page.js.map