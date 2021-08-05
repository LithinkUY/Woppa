import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SegmentosPage } from './segmentos.page';
var routes = [
    {
        path: '',
        component: SegmentosPage
    }
];
var SegmentosPageModule = /** @class */ (function () {
    function SegmentosPageModule() {
    }
    SegmentosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                SegmentosPage
            ]
        })
    ], SegmentosPageModule);
    return SegmentosPageModule;
}());
export { SegmentosPageModule };
//# sourceMappingURL=segmentos.module.js.map