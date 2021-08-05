import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenurhPage } from './menurh.page';
var routes = [
    {
        path: '',
        component: MenurhPage
    }
];
var MenurhPageModule = /** @class */ (function () {
    function MenurhPageModule() {
    }
    MenurhPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenurhPage]
        })
    ], MenurhPageModule);
    return MenurhPageModule;
}());
export { MenurhPageModule };
//# sourceMappingURL=menurh.module.js.map