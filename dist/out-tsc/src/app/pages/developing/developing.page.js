import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
var DevelopingPage = /** @class */ (function () {
    function DevelopingPage(navCtrl, Authorizer, env) {
        this.navCtrl = navCtrl;
        this.Authorizer = Authorizer;
        this.env = env;
        this.AppName = environment.AppNameSigla;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = this.Authorizer.formSubTitle; // 'Usuário';
    }
    DevelopingPage.prototype.ngOnInit = function () {
    };
    DevelopingPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    DevelopingPage = tslib_1.__decorate([
        Component({
            selector: 'app-developing',
            templateUrl: './developing.page.html',
            styleUrls: ['./developing.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthService,
            EnvService])
    ], DevelopingPage);
    return DevelopingPage;
}());
export { DevelopingPage };
//# sourceMappingURL=developing.page.js.map