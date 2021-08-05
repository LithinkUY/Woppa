import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrgaosPage } from './orgaos.page';
var routes = [
    {
        path: '',
        component: OrgaosPage
    }
];
var OrgaosPageModule = /** @class */ (function () {
    function OrgaosPageModule() {
    }
    OrgaosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OrgaosPage]
        })
    ], OrgaosPageModule);
    return OrgaosPageModule;
}());
export { OrgaosPageModule };
//# sourceMappingURL=orgaos.module.js.map