import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConsultaInfracaoPage } from './consultainfracao.page';
var routes = [
    {
        path: '',
        component: ConsultaInfracaoPage
    }
];
var ConsultaInfracaoPageModule = /** @class */ (function () {
    function ConsultaInfracaoPageModule() {
    }
    ConsultaInfracaoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ConsultaInfracaoPage]
        })
    ], ConsultaInfracaoPageModule);
    return ConsultaInfracaoPageModule;
}());
export { ConsultaInfracaoPageModule };
//# sourceMappingURL=consultainfracao.module.js.map