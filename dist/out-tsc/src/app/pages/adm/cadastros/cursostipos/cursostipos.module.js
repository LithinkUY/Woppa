import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CursostiposPage } from './cursostipos.page';
var routes = [
    {
        path: '',
        component: CursostiposPage
    }
];
var CursostiposPageModule = /** @class */ (function () {
    function CursostiposPageModule() {
    }
    CursostiposPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CursostiposPage]
        })
    ], CursostiposPageModule);
    return CursostiposPageModule;
}());
export { CursostiposPageModule };
//# sourceMappingURL=cursostipos.module.js.map