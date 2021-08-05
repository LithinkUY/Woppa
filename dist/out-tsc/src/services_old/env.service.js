import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var EnvService = /** @class */ (function () {
    function EnvService() {
        // API_HOST = 'https://wearplace.com.br';
        this.API_HOST = 'https://localhost';
        // API_URL = '/ServiceGERInfra33/api';
        this.API_URL = '/ServiceInterChip/api';
        this.API_HOST_DEBUG = 'http://localhost:60313';
        this.API_URL_DEBUG = '/api';
        this.DEFINE_ENV = 'Dev'; // Define: [ Debug, Dev, Homo, Prod ]
    }
    /**
     * Funcao para encontrar objetos em uma coleccao de objetos
     *  WEARPLACE TI, LTDA
     * Data: 03/12/2019
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