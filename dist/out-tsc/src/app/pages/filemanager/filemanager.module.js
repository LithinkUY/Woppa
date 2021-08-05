import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FilemanagerPage } from './filemanager.page';
var routes = [
    {
        path: '',
        component: FilemanagerPage
    }
];
var FilemanagerPageModule = /** @class */ (function () {
    function FilemanagerPageModule() {
    }
    FilemanagerPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FilemanagerPage]
        })
    ], FilemanagerPageModule);
    return FilemanagerPageModule;
}());
export { FilemanagerPageModule };
//# sourceMappingURL=filemanager.module.js.map