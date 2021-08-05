import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenusegPage } from './menuseg.page';
var routes = [
    {
        path: '',
        component: MenusegPage
    }
];
var MenusegPageModule = /** @class */ (function () {
    function MenusegPageModule() {
    }
    MenusegPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenusegPage]
        })
    ], MenusegPageModule);
    return MenusegPageModule;
}());
export { MenusegPageModule };
//# sourceMappingURL=menuseg.module.js.map