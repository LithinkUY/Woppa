import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenumidiasPage } from './menumidias.page';
var routes = [
    {
        path: '',
        component: MenumidiasPage
    }
];
var MenumidiasPageModule = /** @class */ (function () {
    function MenumidiasPageModule() {
    }
    MenumidiasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenumidiasPage]
        })
    ], MenumidiasPageModule);
    return MenumidiasPageModule;
}());
export { MenumidiasPageModule };
//# sourceMappingURL=menumidias.module.js.map