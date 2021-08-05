import * as tslib_1 from "tslib";
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
var FilemanagerPage = /** @class */ (function () {
    /* public uploadProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public downloadProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0); */
    function FilemanagerPage(ref, cdRef, navCtrl, alertService, Authorizer, env, popoverController, platform) {
        this.ref = ref;
        this.cdRef = cdRef;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.platform = platform;
    }
    FilemanagerPage.prototype.ngOnInit = function () {
    };
    FilemanagerPage = tslib_1.__decorate([
        Component({
            selector: 'app-filemanager',
            templateUrl: './filemanager.page.html',
            styleUrls: ['./filemanager.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Platform])
    ], FilemanagerPage);
    return FilemanagerPage;
}());
export { FilemanagerPage };
//# sourceMappingURL=filemanager.page.js.map