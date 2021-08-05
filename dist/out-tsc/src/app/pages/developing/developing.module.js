import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DevelopingPage } from './developing.page';
var routes = [
    {
        path: '',
        component: DevelopingPage
    }
];
var DevelopingPageModule = /** @class */ (function () {
    function DevelopingPageModule() {
    }
    DevelopingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DevelopingPage]
        })
    ], DevelopingPageModule);
    return DevelopingPageModule;
}());
export { DevelopingPageModule };
//# sourceMappingURL=developing.module.js.map