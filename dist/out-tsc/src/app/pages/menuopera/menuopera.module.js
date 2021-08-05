import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuoperaPage } from './menuopera.page';
var routes = [
    {
        path: '',
        component: MenuoperaPage
    }
];
var MenuoperaPageModule = /** @class */ (function () {
    function MenuoperaPageModule() {
    }
    MenuoperaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuoperaPage]
        })
    ], MenuoperaPageModule);
    return MenuoperaPageModule;
}());
export { MenuoperaPageModule };
//# sourceMappingURL=menuopera.module.js.map