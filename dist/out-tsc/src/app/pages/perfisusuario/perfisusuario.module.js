import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PerfisusuarioPage } from './perfisusuario.page';
var routes = [
    {
        path: '',
        component: PerfisusuarioPage
    }
];
var PerfisusuarioPageModule = /** @class */ (function () {
    function PerfisusuarioPageModule() {
    }
    PerfisusuarioPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                PerfisusuarioPage
            ]
        })
    ], PerfisusuarioPageModule);
    return PerfisusuarioPageModule;
}());
export { PerfisusuarioPageModule };
//# sourceMappingURL=perfisusuario.module.js.map