import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Device } from '@ionic-native/device/ngx';
var confPage = /** @class */ (function () {
    function confPage(navCtrl, device) {
        this.navCtrl = navCtrl;
        this.device = device;
    }
    confPage.prototype.ngOnInit = function () {
        //print();
    };
    confPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        ////console.log(("ionViewWillEnter");    
    };
    confPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        // //console.log(("ionViewDidEnter");   
        //console.log(('Device UUID is...: ' + this.device.uuid);  
        //this.printer.isAvailable().then(this.onSuccess, this.onError);
    };
    confPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        ////console.log(("ionViewWillLeave");
    };
    confPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        ////console.log(("ionViewDidLeave");
    };
    confPage.prototype.print = function () {
        //this.platform.ready().then(() => {
        // if(this.platform.is('cordova')){
        //this.printer.isAvailable().then(this.onSuccess, this.onError);
    };
    confPage.prototype.onSuccess = function () {
        /*
        let options: PrintOptions = {
          name: 'MyDocument',
          //printerId: 'printer007',
          duplex: true,
          landscape: true,
          grayscale: true
        }
         //console.log(('Sucess Load Printer!!!')
         */
    };
    ;
    confPage.prototype.onError = function () {
        alert('Error : printing is unavailable on your device ');
    };
    confPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    confPage = tslib_1.__decorate([
        Component({
            selector: 'app-conf',
            templateUrl: './conf.page.html',
            styleUrls: ['./conf.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Device])
    ], confPage);
    return confPage;
}());
export { confPage };
//# sourceMappingURL=conf.page.js.map