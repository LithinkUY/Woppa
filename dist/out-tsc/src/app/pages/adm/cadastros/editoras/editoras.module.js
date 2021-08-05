import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditorasPage } from './editoras.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: EditorasPage
    }
];
var EditorasPageModule = /** @class */ (function () {
    function EditorasPageModule() {
    }
    EditorasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IonicSelectableModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditorasPage]
        })
    ], EditorasPageModule);
    return EditorasPageModule;
}());
export { EditorasPageModule };
//# sourceMappingURL=editoras.module.js.map