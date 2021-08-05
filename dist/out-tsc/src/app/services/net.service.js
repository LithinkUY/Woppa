import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
var NetWork = /** @class */ (function () {
    function NetWork(platform, network) {
        this.platform = platform;
        this.network = network;
        this.result = [];
        this.isInternet = false;
        this.IP = '';
        this.NetworkStatus = function (pIP) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            var result = [];
                            var sucess = false;
                            var message = '';
                            var type = '';
                            var status = '';
                            _this.isInternet = (!!pIP);
                            if (!_this.platform.is('cordova')) {
                                // do nothing
                                sucess = _this.isInternet;
                                if (sucess) {
                                    message = 'On-Line';
                                    status = 'On-Line';
                                }
                                else {
                                    message = 'Off-Line';
                                    status = 'Off-Line';
                                }
                            }
                            else {
                                sucess = (_this.isInternet && _this.network.type !== 'none');
                                type = _this.network.type;
                                if (sucess) {
                                    message = 'On-Line';
                                    status = 'On-Line';
                                }
                                else {
                                    message = 'Off-Line';
                                    status = 'Off-Line';
                                }
                            }
                            result.push({
                                Sucess: sucess,
                                Message: message,
                                IP: _this.IP,
                                Type: type,
                                Status: status
                            });
                            resolve(result);
                        })];
                });
            });
        };
    }
    NetWork.prototype.ngOnInit = function () {
        var _this = this;
        var ipAPI = 'https://api.ipify.org?format=json';
        fetch(ipAPI).then(function (response) { return response.json(); }).then(function (data) { return _this.isInternet = true; }).catch(function () { _this.isInternet = false; });
    };
    NetWork = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            Network])
    ], NetWork);
    return NetWork;
}());
export { NetWork };
//# sourceMappingURL=net.service.js.map