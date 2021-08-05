import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContatosPage } from './contatos.page';
var routes = [
    {
        path: '',
        component: ContatosPage
    }
];
var ContatosPageModule = /** @class */ (function () {
    function ContatosPageModule() {
    }
    ContatosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ContatosPage]
        })
    ], ContatosPageModule);
    return ContatosPageModule;
}());
export { ContatosPageModule };
//# sourceMappingURL=contatos.module.js.map