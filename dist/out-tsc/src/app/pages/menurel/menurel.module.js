import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenurelPage } from './menurel.page';
var routes = [
    {
        path: '',
        component: MenurelPage
    }
];
var MenurelPageModule = /** @class */ (function () {
    function MenurelPageModule() {
    }
    MenurelPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenurelPage]
        })
    ], MenurelPageModule);
    return MenurelPageModule;
}());
export { MenurelPageModule };
//# sourceMappingURL=menurel.module.js.map