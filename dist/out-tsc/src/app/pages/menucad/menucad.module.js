import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenucadPage } from './menucad.page';
var routes = [
    {
        path: '',
        component: MenucadPage
    }
];
var MenucadPageModule = /** @class */ (function () {
    function MenucadPageModule() {
    }
    MenucadPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenucadPage]
        })
    ], MenucadPageModule);
    return MenucadPageModule;
}());
export { MenucadPageModule };
//# sourceMappingURL=menucad.module.js.map