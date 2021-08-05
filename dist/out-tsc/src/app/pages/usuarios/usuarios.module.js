import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsuariosPage } from './usuarios.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: UsuariosPage
    }
];
var UsuariosPageModule = /** @class */ (function () {
    function UsuariosPageModule() {
    }
    UsuariosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [
                UsuariosPage
            ]
        })
    ], UsuariosPageModule);
    return UsuariosPageModule;
}());
export { UsuariosPageModule };
//# sourceMappingURL=usuarios.module.js.map