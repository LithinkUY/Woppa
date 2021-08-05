import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
//import { IonInfiniteScroll } from '@ionic/angular';
var DevicesmodalPage = /** @class */ (function () {
    function DevicesmodalPage(nav, modalCtrl, navParams) {
        // componentProps can also be accessed at construction time using NavParams
        //console.log((navParams.data);
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.dataList = [];
        for (var i = 0; i < 25; i++) {
            this.dataList.push("Devices: " + this.dataList.length);
        }
    }
    DevicesmodalPage.prototype.handleInput = function (event) {
        var _this = this;
        var query = event.target.value.toLowerCase();
        requestAnimationFrame(function () {
            _this.dataList.forEach(function (item) {
                var shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    };
    DevicesmodalPage.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            //console.log(('Done');
            for (var i = 0; i < 10; i++) {
                _this.dataList.push("Devices: " + _this.dataList.length);
            }
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.dataList.length == 1000) {
                event.target.disabled = true;
            }
        }, 500);
    };
    /*
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    */
    DevicesmodalPage.prototype.ngOnInit = function () {
    };
    DevicesmodalPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //console.log(("ionViewWillEnter");
    };
    DevicesmodalPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        //console.log(("ionViewDidEnter");    
    };
    DevicesmodalPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        //console.log(("ionViewWillLeave");
    };
    DevicesmodalPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //console.log(("ionViewDidLeave");
    };
    DevicesmodalPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    DevicesmodalPage.prototype.clickedSearch = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DevicesmodalPage.prototype, "firstName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DevicesmodalPage.prototype, "lastName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DevicesmodalPage.prototype, "middleInitial", void 0);
    DevicesmodalPage = tslib_1.__decorate([
        Component({
            selector: 'app-devicesmodal',
            templateUrl: './devicesmodal.page.html',
            styleUrls: ['./devicesmodal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams])
    ], DevicesmodalPage);
    return DevicesmodalPage;
}());
export { DevicesmodalPage };
//# sourceMappingURL=devicesmodal.page.js.map