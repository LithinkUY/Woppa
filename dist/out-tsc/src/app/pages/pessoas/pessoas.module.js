import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PessoasPage } from './pessoas.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: PessoasPage
    }
];
var PessoasPageModule = /** @class */ (function () {
    function PessoasPageModule() {
    }
    PessoasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IonicSelectableModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PessoasPage]
        })
    ], PessoasPageModule);
    return PessoasPageModule;
}());
export { PessoasPageModule };
//# sourceMappingURL=pessoas.module.js.map