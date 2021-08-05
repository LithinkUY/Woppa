import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuestoqPage } from './menuestoq.page';
var routes = [
    {
        path: '',
        component: MenuestoqPage
    }
];
var MenuestoqPageModule = /** @class */ (function () {
    function MenuestoqPageModule() {
    }
    MenuestoqPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuestoqPage]
        })
    ], MenuestoqPageModule);
    return MenuestoqPageModule;
}());
export { MenuestoqPageModule };
//# sourceMappingURL=menuestoq.module.js.map