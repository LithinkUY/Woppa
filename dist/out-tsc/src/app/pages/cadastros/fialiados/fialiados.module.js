import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FialiadosPage } from './fialiados.page';
var routes = [
    {
        path: '',
        component: FialiadosPage
    }
];
var FialiadosPageModule = /** @class */ (function () {
    function FialiadosPageModule() {
    }
    FialiadosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FialiadosPage]
        })
    ], FialiadosPageModule);
    return FialiadosPageModule;
}());
export { FialiadosPageModule };
//# sourceMappingURL=fialiados.module.js.map