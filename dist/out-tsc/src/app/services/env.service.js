import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
var EnvService = /** @class */ (function () {
    function EnvService() {
        //API_HOST = 'https://wearplace.com.br';
        this.API_HOST = 'http://192.168.0.4';
        this.API_URL = '/ServiceConstruAgil/api';
        this.API_HOST_DEBUG = 'http://localhost:60313';
        this.API_URL_DEBUG = '/api';
        this.DEFINE_ENV = 'Dev'; // Define: [ Debug, Dev, Homo, Prod ]
        this.DECIMAL_SEPARATOR = '.';
        this.GROUP_SEPARATOR = ',';
        this.name = 'Angular';
    }
    /*
     // Base64 url of image trimmed one without data:image/png;base64
     string base64="/9j/4AAQSkZJRgABAQE...";
     // Naming the image
     const date = new Date().valueOf();
     let text = '';
     const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     for (let i = 0; i < 5; i++) {
       text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
     }
     // Replace extension according to your media type
     const imageName = date + '.' + text + '.jpeg';
     // call method that creates a blob from dataUri
     const imageBlob = this.dataURItoBlob(base64);
     const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
   */
    EnvService.prototype.getBase64Image = function (img) {
        // We create a HTML canvas object that will create a 2d image
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // This will draw image    
        ctx.drawImage(img, 0, 0);
        // Convert the drawn image to Data URL
        var dataURL = canvas.toDataURL("image/png");
        this.base64DefaultURL = dataURL;
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    EnvService.prototype.dataURItoBlob = function (dataURI) {
        var byteString = window.atob(dataURI);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var int8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    };
    EnvService.prototype.getBase64ImageFromURL = function (url) {
        var _this = this;
        return Observable.create(function (observer) {
            // create an image object
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                // This will call another method that will create image from url
                img.onload = function () {
                    observer.next(_this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = function (err) {
                    observer.error(err);
                };
            }
            else {
                observer.next(_this.getBase64Image(img));
                observer.complete();
            }
        });
    };
    /*   getImage(url) {
        this.getBase64ImageFromURL(url).subscribe((data: string) => {
          this.base64TrimmedURL = data;
        });
        // Naming the image
        const date = new Date().valueOf();
        let text = '';
        const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
          text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
        }
        // Replace extension according to your media type like this
        const imageName = date + '.' + text + '.jpeg';
        console.log(imageName);
        // call method that creates a blob from dataUri
        let imageBlob;
        this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
          imageBlob = data;
        });
        const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
        this.generatedImage = window.URL.createObjectURL(imageFile);
        window.open(this.generatedImage);
      }
     */
    /**
     * Funcao para encontrar objetos em uma coleccao de objetos
     * Exemplo: collection = _findWhere(collection, { key1: val1, keyN: valN })
     * @param collection Array no qual vai ser procurado algum item
     * @param arg objeto com os valores de pesquisa
     */
    EnvService.prototype._findWhere = function (collection, arg) {
        function callback(currentValue, index, array) {
            var flag = true;
            for (var key in arg) {
                if (flag) {
                    if (currentValue.hasOwnProperty(key)) {
                        if (currentValue[key] === null) {
                            currentValue[key] = '';
                        }
                        if (Number(currentValue[key])) {
                            currentValue[key] = currentValue[key].toString();
                        }
                        if (Number(arg[key])) {
                            arg[key] = arg[key].toString();
                        }
                        flag = (currentValue[key].toLowerCase().indexOf(arg[key].toLowerCase()) > -1) ? true : false;
                    }
                }
            }
            if (flag) {
                return currentValue;
            }
        }
        return collection.filter(callback, arg);
    };
    EnvService.prototype.formatMask = function (value, type) {
        if (!value) {
            return '';
        }
        var val = value.toString();
        var parts = this.unFormatMask(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (type === 'CPFCNPJ') {
            if (parts[0].length <= 11) {
                this.maskedId = this.cpf_mask(parts[0]);
                return this.maskedId;
            }
            else {
                this.maskedId = this.cnpj(parts[0]);
                return this.maskedId;
            }
        }
        if (type === 'CEP') {
            this.maskedId = this.cep(parts[0]);
            return this.maskedId;
        }
        if (type === 'TELEFONE') {
            this.maskedId = this.telefone(parts[0]);
            return this.maskedId;
        }
        if (type === 'RAMAL') {
            this.maskedId = this.ramal(parts[0]);
            return this.maskedId;
        }
        if (type === 'TIME') {
            this.maskedId = this.time(parts[0]);
            return this.maskedId;
        }
    };
    EnvService.prototype.unFormatMask = function (val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        }
        else {
            return val.replace(/\./g, '');
        }
    };
    EnvService.prototype.cpf_mask = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    EnvService.prototype.cnpj = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    EnvService.prototype.time = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{2})(\d)/, '$1:$2'); // Coloca : entre o segundo e o quarto dígitos
        v = v.replace(/(\d{2})(\d)/, '$1:$2'); // Coloca : entre o segundo e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1:$2'); // Coloca : entre o quarto e o sexto dígitos
        return v;
    };
    EnvService.prototype.ramal = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o segundo e o quarto dígitos    
        return v;
    };
    EnvService.prototype.cep = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1-$2'); // Coloca uma barra entre o oitavo e o nono dígitos    
        return v;
    };
    EnvService.prototype.telefone = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
        return v.substr(0, 15);
    };
    EnvService.prototype.celular = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
        return v.substr(0, 15);
    };
    EnvService.prototype.MoedaReal = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    EnvService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], EnvService);
    return EnvService;
}());
export { EnvService };
//# sourceMappingURL=env.service.js.map