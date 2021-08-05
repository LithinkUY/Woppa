import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CursosPage } from './cursos.page';
var routes = [
    {
        path: '',
        component: CursosPage
    }
];
var CursosPageModule = /** @class */ (function () {
    function CursosPageModule() {
    }
    CursosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CursosPage]
        })
    ], CursosPageModule);
    return CursosPageModule;
}());
export { CursosPageModule };
//# sourceMappingURL=cursos.module.js.map