import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import * as es6printJS from "print-js";
// import printJS = require("print-js");
var ReaderPage = /** @class */ (function () {
    function ReaderPage(plataform, file, fl, fileOpener, document) {
        this.plataform = plataform;
        this.file = file;
        this.fl = fl;
        this.fileOpener = fileOpener;
        this.document = document;
        this.title = "Print.js exemplo no Angular";
    }
    ReaderPage.prototype.ngOnInit = function () {
    };
    ReaderPage.prototype.printTest = function () {
        console.log({
            // node_module: printJS,
            es6_module: es6printJS
        });
        es6printJS("test", "html");
        //data = pdf
        /* let pdfBlob = new Blob([], { type: "application/pdf" });
        let urlJS :any = URL.createObjectURL(pdfBlob);
        es6printJS(urlJS);
        
        let blob = new Blob([],{type:'application/pdf'});
        let url: any = URL.createObjectURL(blob);
        window.open(url);
        */
    };
    ReaderPage.prototype.openLocalPdf = function () {
        var _this = this;
        var filePath = this.file.applicationDirectory = environment.pathPdfs;
        console.log(filePath);
        if (this.plataform.is('android')) {
            var fakeName = Date.now();
            this.file.copyFile(filePath, 'livro.pdf', this.file.dataDirectory, fakeName + ".pdf").then(function (result) {
                _this.fileOpener.open(result.nativeURL, 'application/pdf');
            });
        }
        else {
            var options = {
                title: 'PDF Reader'
            };
            this.document.viewDocument(filePath + "livro.pdf", 'application/pdf', options);
        }
    };
    ReaderPage.prototype.downloadAndOpenPdf = function () {
        var _this = this;
        var downloadUrl = 'https://wearplace.com.br/livro.pdf';
        var path = this.file.dataDirectory;
        var transfer = this.ft.create();
        transfer.download(downloadUrl, path + "livro.pdf", 'application/pdf').then(function (entry) {
            var url = entry.toURL();
            if (_this.plataform.is('ios')) {
                _this.document.viewDocument(url, 'application/pdf', {});
            }
            else {
                _this.fileOpener.open(url, 'application/pdf');
            }
        });
    };
    ReaderPage = tslib_1.__decorate([
        Component({
            selector: 'app-reader',
            templateUrl: './reader.page.html',
            styleUrls: ['./reader.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            File,
            FileTransfer,
            FileOpener,
            DocumentViewer])
    ], ReaderPage);
    return ReaderPage;
}());
export { ReaderPage };
//# sourceMappingURL=reader.page.js.map