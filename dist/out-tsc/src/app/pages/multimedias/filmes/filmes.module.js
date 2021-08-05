import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FilmesPage } from './filmes.page';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
var routes = [
    {
        path: '',
        component: FilmesPage
    }
];
var FilmesPageModule = /** @class */ (function () {
    function FilmesPageModule() {
    }
    FilmesPageModule = tslib_1.__decorate([
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
            declarations: [FilmesPage]
        })
    ], FilmesPageModule);
    return FilmesPageModule;
}());
export { FilmesPageModule };
//# sourceMappingURL=filmes.module.js.map