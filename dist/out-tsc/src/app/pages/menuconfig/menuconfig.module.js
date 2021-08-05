import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { MenuconfigPage } from './menuconfig.page';
var routes = [
    {
        path: '',
        component: MenuconfigPage
    }
];
var MenuconfigModule = /** @class */ (function () {
    function MenuconfigModule() {
    }
    MenuconfigModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuconfigPage]
        })
    ], MenuconfigModule);
    return MenuconfigModule;
}());
export { MenuconfigModule };
//# sourceMappingURL=menuconfig.module.js.map