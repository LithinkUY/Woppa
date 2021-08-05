import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EquipamentosAfericaoPage } from './equipamentos-afericao.page';
var routes = [
    {
        path: '',
        component: EquipamentosAfericaoPage
    }
];
var EquipamentosAfericaoPageModule = /** @class */ (function () {
    function EquipamentosAfericaoPageModule() {
    }
    EquipamentosAfericaoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EquipamentosAfericaoPage]
        })
    ], EquipamentosAfericaoPageModule);
    return EquipamentosAfericaoPageModule;
}());
export { EquipamentosAfericaoPageModule };
//# sourceMappingURL=equipamentos-afericao.module.js.map