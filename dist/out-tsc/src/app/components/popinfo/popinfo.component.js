import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
var PopinfoComponent = /** @class */ (function () {
    function PopinfoComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    PopinfoComponent.prototype.ngOnInit = function () { };
    PopinfoComponent.prototype.onClick = function (valor) {
        this.popoverCtrl.dismiss({
            item: valor
        });
    };
    PopinfoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popinfo',
            templateUrl: './popinfo.component.html',
            styleUrls: ['./popinfo.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], PopinfoComponent);
    return PopinfoComponent;
}());
export { PopinfoComponent };
//# sourceMappingURL=popinfo.component.js.map