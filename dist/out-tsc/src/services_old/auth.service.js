import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { Network }      from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from './env.service';
// import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
var AuthService = /** @class */ (function () {
    function AuthService(http, platform, 
    // private network: Network,
    env, alertService, 
    // private base64: Base64
    db) {
        this.http = http;
        this.platform = platform;
        this.env = env;
        this.alertService = alertService;
        this.db = db;
        this.headers = new Headers();
        this.isLoggedIn = false;
        this.CodigoMenuPai = 99;
        this.CodigoMenuGrupoL = 100;
        this.CodigoMenuGrupoP = 99;
        this.formTitle = 'Menu - Principal';
        this.API_HOST = this.env.API_HOST;
        this.API_URL = this.env.API_URL;
        // 13/12/2019, Lina
        // Permissoes do usuário
        this.permissoesUsuario = [];
        this.Login = function (form) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ParamDataJson, strDataJson, StoreProcName, paramUrlAPI, paramsAPI, EngineAPI;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    ParamDataJson = btoa(JSON.stringify(form.value));
                    strDataJson = atob(ParamDataJson);
                    StoreProcName = 'spUsuarioAuthentication';
                    paramUrlAPI = this.API_HOST + this.API_URL + '/authentication?';
                    paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    // console.log((EngineAPI);
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.get(EngineAPI);
                            _this.coletionsData.subscribe(function (data) {
                                if (data[0].success) {
                                    _this.HashKey = data[0].hashkey;
                                    var resultado = atob(data[0].results);
                                    // this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
                                    _this.CodigoUsuarioSistema = JSON.parse(resultado)[0].CodigoUsuario;
                                    _this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
                                    _this.NomeUsuarioSistema = JSON.parse(resultado)[0].Nome;
                                    _this.permissoesUsuario = _this.consultarPermisoes();
                                    _this.db.set('LSU', data[0].results);
                                    _this.db.set('HKEY', data[0].hashkey);
                                }
                                else {
                                    sessionStorage.setItem('SessionConection', '0');
                                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Autendicação no Sistema', pMessage: data[0].message });
                                }
                                var ResultsDecode = JSON.parse(_this.utf8Decode(JSON.stringify(atob(data[0].results))));
                                data[0].results = btoa(ResultsDecode);
                                resolve(data);
                            }, function (error) {
                                _this.alertService.presentAlert({
                                    pTitle: 'Atenção',
                                    pSubtitle: 'Servidor Indisponível. Tente mais tarde!!!',
                                    pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                                });
                            });
                        })];
                });
            });
        };
        this.FailurePost = function (method, form) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var json, paramMethod, paramUrlAPI, ParamDataJson, data2;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    json = JSON.stringify(form.value);
                    paramMethod = method;
                    paramUrlAPI = this.env.API_HOST + this.env.API_URL + +'/' + paramMethod;
                    ParamDataJson = btoa(json);
                    data2 = { JsonParam: ParamDataJson };
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.post(paramUrlAPI, data2);
                            _this.coletionsData.subscribe(function (data) {
                                resolve(data);
                            }, function (error) {
                                resolve(error);
                                /*
                                 this.alertService.presentAlert(
                                  { pTitle: "Atenção",
                                    pSubtitle: 'Servidor ou Método Indisponível. Tente mais tarde!!!',
                                    pMessage: 'Status Error:' + error.status + ' | ' + error.statusText });
                                    // console.log("Error: ", error);
                                  */
                            });
                        })];
                });
            });
        };
        this.QueryStoreProc = function (MetodoNameAPI, StoreProcName, ParamsJson) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ParamDataJson, paramUrlAPI, paramsAPI, EngineAPI, EngineAPIDebug;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    // --------------------------------------------------------------------------------------------
                    // Função Gerenerica de consulta no Service API
                    // Criação / Atualização: 29/07/2019 as 10:42
                    // Por Gilson DeLima
                    // --------------------------------------------------------------------------------------------
                    // MetodoNameAPI = 'Executar';
                    ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
                    ParamsJson = ParamsJson.replace(/\\/g, '');
                    ParamDataJson = btoa(ParamsJson);
                    paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI + '?';
                    paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    EngineAPIDebug = this.env.API_HOST_DEBUG + this.env.API_URL_DEBUG + '/' + MetodoNameAPI + '?' + paramsAPI;
                    // console.log(EngineAPI);
                    this.alertService.presentToast('Processando...');
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.get(EngineAPI);
                            _this.coletionsData.subscribe(function (data) {
                                var ResultsDecode = JSON.parse(_this.utf8Decode(JSON.stringify(atob(data[0].results))));
                                data[0].results = btoa(ResultsDecode);
                                resolve(data);
                            }, function (error) {
                                _this.alertService.presentAlert({
                                    pTitle: 'Atenção',
                                    pSubtitle: 'Servidor ou Método Indisponível (' + StoreProcName + '). Tente mais tarde!!!',
                                    pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                                });
                                resolve(error);
                            });
                        })];
                });
            });
        };
        this.QueryStoreProcPost = function (MetodoNameAPI, pStoreProcName, ParamsJson) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ParamDataJson, paramUrlAPI, dataPost;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    // --------------------------------------------------------------------------------------------    
                    // Função Gerenerica de consulta no Service API
                    // Criação / Atualização: 29/07/2019 as 10:42
                    // Por Gilson DeLima
                    // --------------------------------------------------------------------------------------------
                    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
                    // --------------------------------------------------------------------------------------------
                    // this.alertService.showLoader("Processando... Aguarde por favor!!!");
                    ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
                    ParamsJson = ParamsJson.replace(/\\/g, '');
                    console.log('json:', ParamsJson);
                    ParamDataJson = btoa(ParamsJson);
                    paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI;
                    console.log('api:', paramUrlAPI);
                    dataPost = {
                        StoreProcName: pStoreProcName,
                        DataJson: ParamDataJson
                    };
                    console.log('dataPost:', dataPost);
                    // this.alertService.presentToast("Processando...");
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.post(paramUrlAPI, dataPost);
                            _this.coletionsData.subscribe(function (data) {
                                var ResultsDecode = JSON.parse(_this.utf8Decode(JSON.stringify(atob(data[0].results))));
                                data[0].results = btoa(ResultsDecode);
                                resolve(data);
                            }, function (error) {
                                _this.alertService.presentAlert({
                                    pTitle: 'Atenção',
                                    pSubtitle: 'Servidor ou Método Indisponível (' + pStoreProcName + '). Tente mais tarde!!!',
                                    pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                                });
                                resolve(error);
                            });
                        })];
                });
            });
        };
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        if (this.env.DEFINE_ENV === 'Debug') {
            this.API_HOST = env.API_HOST_DEBUG;
            this.API_URL = env.API_URL_DEBUG;
        }
    }
    AuthService.prototype.setFilter = function (filtro) {
        this.Filter = filtro;
    };
    AuthService.prototype.getFilter = function () {
        if (typeof (this.Filter) === 'undefined') {
            this.Filter = '';
        }
        if (this.Filter == null) {
            this.Filter = '';
        }
        return this.Filter;
    };
    AuthService.prototype.consultarPermisoes = function () {
        var _this = this;
        var params = {
            CodigoUsuarioSistema: this.CodigoUsuarioSistema,
            CodigoMenuSistemaPai: this.CodigoMenuPai,
            Hashkey: this.HashKey
        };
        this.QueryStoreProc('Executar', 'spPermissoesPorUsuario', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.permissoesUsuario = JSON.parse(atob(resultado.results));
                }
                else {
                    console.log('Sem permissões');
                }
            }
            catch (err) {
                console.log('Sem permissões');
            }
        });
    };
    /**
     * Encodes multi-byte Unicode string into utf-8 multiple single-byte characters
     * (BMP / basic multilingual plane only).
     *
     * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars.
     *
     * Can be achieved in JavaScript by unescape(encodeURIComponent(str)),
     * but this approach may be useful in other languages.
     *
     * @param   {string} unicodeString - Unicode string to be encoded as UTF-8.
     * @returns {string} UTF8-encoded string.
     */
    AuthService.prototype.utf8Encode = function (unicodeString) {
        if (typeof unicodeString != 'string')
            throw new TypeError('parameter ‘unicodeString’ is not a string');
        var utf8String = unicodeString.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        }).replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        });
        return utf8String;
    };
    /**
    * Decodes utf-8 encoded string back into multi-byte Unicode characters.
    *
    * Can be achieved JavaScript by decodeURIComponent(escape(str)),
    * but this approach may be useful in other languages.
    *
    * @param   {string} utf8String - UTF-8 string to be decoded back to Unicode.
    * @returns {string} Decoded Unicode string.
    */
    AuthService.prototype.utf8Decode = function (utf8String) {
        if (typeof utf8String != 'string')
            throw new TypeError('parameter ‘utf8String’ is not a string');
        // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
        var unicodeString = utf8String.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
        function (c) {
            var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
        function (c) {
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        });
        return unicodeString;
    };
    AuthService.prototype.convertUtf8ToAscii = function (str) {
        var asciiStr = '';
        var refTable = {
            199: 128, 252: 129, 233: 130, 226: 131, 228: 132, 224: 133, 231: 135, 234: 136, 235: 137, 232: 138,
            239: 139, 238: 140, 236: 141, 196: 142, 201: 144, 244: 147, 246: 148, 242: 149, 251: 150, 249: 151
        };
        for (var i = 0; i < str.length; i++) {
            var ascii = refTable[str.charCodeAt(i)];
            if (ascii != undefined)
                asciiStr += "%" + ascii;
            else
                asciiStr += str[i];
        }
        return asciiStr;
    };
    AuthService.prototype.ascii_to_hexa = function (str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    };
    AuthService.prototype.UTF8ArrToStr = function (aBytes) {
        var sView = "";
        for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
            nPart = aBytes[nIdx];
            sView += String.fromCharCode(nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
                /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
                (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24)
                    + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12)
                    + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
                : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
                    (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18)
                        + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
                    : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
                        (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12)
                            + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
                        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
                            (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
                            : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
                                (nPart - 192 << 6) + aBytes[++nIdx] - 128
                                : /* nPart < 127 ? */ /* one byte */
                                    nPart);
        }
        return sView;
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Platform,
            EnvService,
            AlertService,
            Storage])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map