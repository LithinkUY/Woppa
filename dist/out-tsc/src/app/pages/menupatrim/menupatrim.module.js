import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenupatrimPage } from './menupatrim.page';
var routes = [
    {
        path: '',
        component: MenupatrimPage
    }
];
var MenupatrimPageModule = /** @class */ (function () {
    function MenupatrimPageModule() {
    }
    MenupatrimPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenupatrimPage]
        })
    ], MenupatrimPageModule);
    return MenupatrimPageModule;
}());
export { MenupatrimPageModule };
//# sourceMappingURL=menupatrim.module.js.map