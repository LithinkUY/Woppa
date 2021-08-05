import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenusadmPage } from './menusadm.page';
var routes = [
    {
        path: '',
        component: MenusadmPage
    }
];
var MenusadmPageModule = /** @class */ (function () {
    function MenusadmPageModule() {
    }
    MenusadmPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenusadmPage]
        })
    ], MenusadmPageModule);
    return MenusadmPageModule;
}());
export { MenusadmPageModule };
//# sourceMappingURL=menusadm.module.js.map