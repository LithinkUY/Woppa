import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DevicesmodalPage } from './devicesmodal.page';
var routes = [
    {
        path: '',
        component: DevicesmodalPage
    }
];
var DevicesmodalPageModule = /** @class */ (function () {
    function DevicesmodalPageModule() {
    }
    DevicesmodalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DevicesmodalPage]
        })
    ], DevicesmodalPageModule);
    return DevicesmodalPageModule;
}());
export { DevicesmodalPageModule };
//# sourceMappingURL=devicesmodal.module.js.map