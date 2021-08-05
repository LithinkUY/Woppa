import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PerfisPage } from './perfis.page';
var routes = [
    {
        path: '',
        component: PerfisPage
    }
];
var PerfisPageModule = /** @class */ (function () {
    function PerfisPageModule() {
    }
    PerfisPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                PerfisPage,
            ]
        })
    ], PerfisPageModule);
    return PerfisPageModule;
}());
export { PerfisPageModule };
//# sourceMappingURL=perfis.module.js.map