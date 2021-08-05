import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TipoAfericaoPage } from './tipo-afericao.page';
var routes = [
    {
        path: '',
        component: TipoAfericaoPage
    }
];
var TipoAfericaoPageModule = /** @class */ (function () {
    function TipoAfericaoPageModule() {
    }
    TipoAfericaoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TipoAfericaoPage]
        })
    ], TipoAfericaoPageModule);
    return TipoAfericaoPageModule;
}());
export { TipoAfericaoPageModule };
//# sourceMappingURL=tipo-afericao.module.js.map