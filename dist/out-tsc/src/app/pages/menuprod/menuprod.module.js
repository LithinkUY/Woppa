import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuprodPage } from './menuprod.page';
var routes = [
    {
        path: '',
        component: MenuprodPage
    }
];
var MenuprodPageModule = /** @class */ (function () {
    function MenuprodPageModule() {
    }
    MenuprodPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuprodPage]
        })
    ], MenuprodPageModule);
    return MenuprodPageModule;
}());
export { MenuprodPageModule };
//# sourceMappingURL=menuprod.module.js.map