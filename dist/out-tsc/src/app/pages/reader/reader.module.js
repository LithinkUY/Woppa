import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReaderPage } from './reader.page';
/*
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx'; */
var routes = [
    {
        path: '',
        component: ReaderPage
    }
];
var ReaderPageModule = /** @class */ (function () {
    function ReaderPageModule() {
    }
    ReaderPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ReaderPage],
            providers: [
            /* File,
            FileOpener,
            DocumentViewer,
            FileTransfer */
            ]
        })
    ], ReaderPageModule);
    return ReaderPageModule;
}());
export { ReaderPageModule };
//# sourceMappingURL=reader.module.js.map