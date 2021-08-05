import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConsultaInfracaoModalPage } from './consultainfracaomodal.page';
var routes = [
    {
        path: '',
        component: ConsultaInfracaoModalPage
    }
];
var ConsultaInfracaoModalPageModule = /** @class */ (function () {
    function ConsultaInfracaoModalPageModule() {
    }
    ConsultaInfracaoModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ConsultaInfracaoModalPage]
        })
    ], ConsultaInfracaoModalPageModule);
    return ConsultaInfracaoModalPageModule;
}());
export { ConsultaInfracaoModalPageModule };
//# sourceMappingURL=consultainfracaomodal.module.js.map