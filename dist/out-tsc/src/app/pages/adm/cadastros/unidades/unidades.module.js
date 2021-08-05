import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UnidadesPage } from './unidades.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: UnidadesPage
    }
];
var UnidadesPageModule = /** @class */ (function () {
    function UnidadesPageModule() {
    }
    UnidadesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IonicSelectableModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UnidadesPage]
        })
    ], UnidadesPageModule);
    return UnidadesPageModule;
}());
export { UnidadesPageModule };
//# sourceMappingURL=unidades.module.js.map