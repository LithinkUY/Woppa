import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingPage } from './loading.page';
var routes = [
    {
        path: '',
        component: LoadingPage
    }
];
var LoadingPageModule = /** @class */ (function () {
    function LoadingPageModule() {
    }
    LoadingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoadingPage]
        })
    ], LoadingPageModule);
    return LoadingPageModule;
}());
export { LoadingPageModule };
//# sourceMappingURL=loading.module.js.map