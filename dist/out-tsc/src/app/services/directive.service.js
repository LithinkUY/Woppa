import * as tslib_1 from "tslib";
import { Directive, HostBinding, ElementRef } from '@angular/core';
var ShowHideInput = /** @class */ (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = 'password';
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type; // alterar o tipo de ion-input 
    };
    tslib_1.__decorate([
        HostBinding(),
        tslib_1.__metadata("design:type", String)
    ], ShowHideInput.prototype, "type", void 0);
    ShowHideInput = tslib_1.__decorate([
        Directive({
            selector: '[show-hide-input]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], ShowHideInput);
    return ShowHideInput;
}());
export { ShowHideInput };
//# sourceMappingURL=directive.service.js.map