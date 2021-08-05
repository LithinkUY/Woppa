import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeisPage } from './leis.page';
var routes = [
    {
        path: '',
        component: LeisPage
    }
];
var LeisPageModule = /** @class */ (function () {
    function LeisPageModule() {
    }
    LeisPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LeisPage]
        })
    ], LeisPageModule);
    return LeisPageModule;
}());
export { LeisPageModule };
//# sourceMappingURL=leis.module.js.map