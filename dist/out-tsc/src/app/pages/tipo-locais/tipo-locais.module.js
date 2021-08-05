import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TipoLocaisPage } from './tipo-locais.page';
var routes = [
    {
        path: '',
        component: TipoLocaisPage
    }
];
var TipoLocaisPageModule = /** @class */ (function () {
    function TipoLocaisPageModule() {
    }
    TipoLocaisPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TipoLocaisPage]
        })
    ], TipoLocaisPageModule);
    return TipoLocaisPageModule;
}());
export { TipoLocaisPageModule };
//# sourceMappingURL=tipo-locais.module.js.map