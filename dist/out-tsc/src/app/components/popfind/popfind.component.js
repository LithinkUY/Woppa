import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
var PopfindComponent = /** @class */ (function () {
    function PopfindComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    PopfindComponent.prototype.ngOnInit = function () { };
    PopfindComponent.prototype.onClick = function (valor) {
        this.popoverCtrl.dismiss({
            item: valor
        });
    };
    PopfindComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popfind',
            templateUrl: './popfind.component.html',
            styleUrls: ['./popfind.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], PopfindComponent);
    return PopfindComponent;
}());
export { PopfindComponent };
//# sourceMappingURL=popfind.component.js.map