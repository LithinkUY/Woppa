import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BairrosPage } from './bairros.page';
var routes = [
    {
        path: '',
        component: BairrosPage
    }
];
var BairrosPageModule = /** @class */ (function () {
    function BairrosPageModule() {
    }
    BairrosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BairrosPage]
        })
    ], BairrosPageModule);
    return BairrosPageModule;
}());
export { BairrosPageModule };
//# sourceMappingURL=bairros.module.js.map