import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenufinPage } from './menufin.page';
var routes = [
    {
        path: '',
        component: MenufinPage
    }
];
var MenufinPageModule = /** @class */ (function () {
    function MenufinPageModule() {
    }
    MenufinPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenufinPage]
        })
    ], MenufinPageModule);
    return MenufinPageModule;
}());
export { MenufinPageModule };
//# sourceMappingURL=menufin.module.js.map