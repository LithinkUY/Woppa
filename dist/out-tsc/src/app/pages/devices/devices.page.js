import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
//import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { DevicesmodalPage } from '../devicesmodal/devicesmodal.page';
var DevicesPage = /** @class */ (function () {
    function DevicesPage(navCtrl, alertService, env, Authorizer, Eventos, modalController) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.Eventos = Eventos;
        this.modalController = modalController;
        this.segs = [
            {
                id: 0,
                segmento: 'Todos'
            }
        ];
        this.groupsDef = [
            {
                id: 1,
                nome: 'Todos'
            }
        ];
        this.groups = [
            {
                id: 1,
                nome: 'Todos'
            }
        ];
        this.users = [
            {
                id: 0,
                usuario: 'Todos'
            }
        ];
        this.sysos = [
            {
                id: 1,
                nome: 'Android'
            },
            {
                id: 2,
                nome: 'IOS'
            }
        ];
        this.dataReturned = 'Dados';
        this.familia = [
            {
                nome: 'Vitor',
                sobreNome: 'Borges'
            },
            {
                nome: 'Emerson',
                sobreNome: 'Daniel'
            },
            {
                nome: 'Thiago',
                sobreNome: 'Contre!'
            }
        ];
    }
    DevicesPage.prototype.ngOnInit = function () {
        //console.log((this.familia);
        // this.DataSet = JSON.parse(sessionStorage.SessionUser);      
        //this.setValue(); 
        this.CodigoUsuario = sessionStorage.getItem("SessionCodigoUsuario");
        this.NomeUsuarioLogado = sessionStorage.getItem("SessionNomeUsuario");
    };
    DevicesPage.prototype.reciverFeedback = function (respostaFilho) {
        //console.log(('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
    };
    DevicesPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //console.log(("ionViewWillEnter");
    };
    DevicesPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        //console.log(("ionViewDidEnter");
        this.PopulaSeguimento(0);
    };
    DevicesPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        //console.log(("ionViewWillLeave");
    };
    DevicesPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //console.log(("ionViewDidLeave");
    };
    DevicesPage.prototype.PopulaSeguimento = function (item) {
        var _this = this;
        //console.log((item);
        var params = {
            'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
            'todos': '',
            'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        this.Authorizer.QueryStoreProc('ConsultaSegmentos', '', params).then(function (res) {
            var resultado = res;
            try {
                if (resultado.length == 0) {
                    //nenhum modulo encontrado
                    _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: 'Menu', pMessage: 'Nenhum segmento encontrado!' });
                }
                else {
                    //mostro os módulos
                    //console.log((resultado);
                    _this.segs = resultado;
                }
            }
            catch (err) {
                _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: 'Menu', pMessage: 'Nenhum segmento!' });
            }
        });
    };
    DevicesPage.prototype.PopulaGrupos = function (form, event) {
        var _this = this;
        var params = {
            'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
            'segmento': form.value.Seguimento,
            'nivel': '',
            'grupo': '',
            'todos': '',
            'nome': '',
            'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        this.Authorizer.QueryStoreProc('ConsultaGrupos', '', params).then(function (res) {
            var resultado = res;
            try {
                if (resultado.length == 0) {
                    //nenhum modulo encontrado
                    _this.groups = _this.groupsDef;
                    _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: 'Menu', pMessage: 'Nenhum grupo encontrado!' });
                }
                else {
                    //mostro os módulos
                    //console.log((resultado);
                    _this.groups = resultado;
                }
            }
            catch (err) {
                _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: '', pMessage: 'Nenhum grupo!' });
            }
        });
    };
    DevicesPage.prototype.PopulaUsuarios = function (form, event) {
        var _this = this;
        //this.grupo = form.value.Seguimento;
        var params = {
            'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
            'segmento': form.value.Seguimento,
            'grupo': form.value.grupo,
            'nome': '',
            'matricula': '',
            'cpf': '',
            'todos': '',
            'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        this.Authorizer.QueryStoreProc('ConsultaUsuarios', '', params).then(function (res) {
            var resultado = res;
            try {
                if (resultado.length == 0) {
                    //nenhum modulo encontrado
                    _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: 'Menu', pMessage: 'Nenhum usuário encontrado!' });
                }
                else {
                    //mostro os módulos
                    //console.log((resultado);
                    _this.users = resultado;
                }
            }
            catch (err) {
                _this.alertService.presentAlert({ pTitle: 'MOP', pSubtitle: 'Menu', pMessage: 'Nenhum usuário!' });
            }
        });
    };
    DevicesPage.prototype.Pesquisar = function (form, event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: DevicesmodalPage,
                            componentProps: form.value
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DevicesPage.prototype.Adicionar = function (form, event) {
        //console.log((form.value);
        //console.log((event);
        this.alertService.presentAlertCheckbox();
    };
    DevicesPage.prototype.Gravar = function (form, event) {
        var _this = this;
        //form.value.senha = Md5.hashStr(form.value.senha);
        this.Authorizer.Login(form).then(function (res) {
            ////console.log(("Resultado Json:", res);
            var resultado = res[0];
            if (resultado.success == true) {
                _this.alertService.showLoader(resultado.message);
            }
        });
    };
    DevicesPage = tslib_1.__decorate([
        Component({
            selector: 'app-devices',
            templateUrl: './devices.page.html',
            styleUrls: ['./devices.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            Events,
            ModalController])
    ], DevicesPage);
    return DevicesPage;
}());
export { DevicesPage };
//# sourceMappingURL=devices.page.js.map