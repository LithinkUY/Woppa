import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
var OptionsPage = /** @class */ (function () {
    function OptionsPage(Authorizer) {
        this.Authorizer = Authorizer;
    }
    OptionsPage.prototype.ngOnInit = function () {
    };
    OptionsPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // //console.log(("ionViewDidEnter");
    };
    OptionsPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // //console.log(("ionViewDidLeave");
    };
    OptionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-menuoptions',
            templateUrl: './menuoptions.page.html',
            styleUrls: ['./menuoptions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], OptionsPage);
    return OptionsPage;
}());
export { OptionsPage };
//# sourceMappingURL=menuoptions.page.js.map