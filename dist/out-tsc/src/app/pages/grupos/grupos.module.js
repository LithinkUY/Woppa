import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GruposPage } from './grupos.page';
var routes = [
    {
        path: '',
        component: GruposPage
    }
];
var GruposPageModule = /** @class */ (function () {
    function GruposPageModule() {
    }
    GruposPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                GruposPage
            ]
        })
    ], GruposPageModule);
    return GruposPageModule;
}());
export { GruposPageModule };
//# sourceMappingURL=grupos.module.js.map