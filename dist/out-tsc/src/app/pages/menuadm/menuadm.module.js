import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuadmPage } from './menuadm.page';
var routes = [
    {
        path: '',
        component: MenuadmPage
    }
];
var MenuadmPageModule = /** @class */ (function () {
    function MenuadmPageModule() {
    }
    MenuadmPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuadmPage]
        })
    ], MenuadmPageModule);
    return MenuadmPageModule;
}());
export { MenuadmPageModule };
//# sourceMappingURL=menuadm.module.js.map