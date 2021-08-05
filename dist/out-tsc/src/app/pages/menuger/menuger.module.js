import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenugerPage } from './menuger.page';
var routes = [
    {
        path: '',
        component: MenugerPage
    }
];
var MenugerPageModule = /** @class */ (function () {
    function MenugerPageModule() {
    }
    MenugerPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenugerPage]
        })
    ], MenugerPageModule);
    return MenugerPageModule;
}());
export { MenugerPageModule };
//# sourceMappingURL=menuger.module.js.map