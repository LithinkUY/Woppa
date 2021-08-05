import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { PrincipalPage } from './principal.page';
var routes = [
    {
        path: '',
        component: PrincipalPage
    }
];
var principalPageModule = /** @class */ (function () {
    function principalPageModule() {
    }
    principalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PrincipalPage]
        })
    ], principalPageModule);
    return principalPageModule;
}());
export { principalPageModule };
//# sourceMappingURL=principal.module.js.map