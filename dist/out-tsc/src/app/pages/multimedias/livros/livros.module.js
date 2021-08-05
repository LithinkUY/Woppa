import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LivrosPage } from './livros.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
var routes = [
    {
        path: '',
        component: LivrosPage
    }
];
var LivrosPageModule = /** @class */ (function () {
    function LivrosPageModule() {
    }
    LivrosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                VgCoreModule,
                VgControlsModule,
                VgOverlayPlayModule,
                VgBufferingModule
            ],
            declarations: [LivrosPage]
        })
    ], LivrosPageModule);
    return LivrosPageModule;
}());
export { LivrosPageModule };
//# sourceMappingURL=livros.module.js.map