import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProdutosPage } from './produtos.page';
var routes = [
    {
        path: '',
        component: ProdutosPage
    }
];
var ProdutosPageModule = /** @class */ (function () {
    function ProdutosPageModule() {
    }
    ProdutosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProdutosPage]
        })
    ], ProdutosPageModule);
    return ProdutosPageModule;
}());
export { ProdutosPageModule };
//# sourceMappingURL=produtos.module.js.map