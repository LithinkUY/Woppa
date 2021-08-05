import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PermissoesPage } from './permissoes.page';
var routes = [
    {
        path: '',
        component: PermissoesPage
    }
];
var PermissoesPageModule = /** @class */ (function () {
    function PermissoesPageModule() {
    }
    PermissoesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PermissoesPage]
        })
    ], PermissoesPageModule);
    return PermissoesPageModule;
}());
export { PermissoesPageModule };
//# sourceMappingURL=permissoes.module.js.map