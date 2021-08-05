import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VgStates } from 'videogular2/src/core/states/vg-states';
import { VgEvents } from 'videogular2/src/core/events/vg-events';
import { NavController, PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { Editoras } from 'src/app/models/editoras';
import { Platform } from '@ionic/angular';
var EditorasPage = /** @class */ (function () {
    function EditorasPage(ref, cdRef, navCtrl, alertService, Authorizer, env, popoverController, router, platform) {
        this.ref = ref;
        this.cdRef = cdRef;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.platform = platform;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.buffered = { length: 1, end: function (end) { return 0; } };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isFullscreen = false;
        this.isCompleted = false;
        this.isLive = false;
        this.state = VgStates.VG_PAUSED;
        this.FiveIcon = environment.logoCliente;
        this.subtitleVideo = environment.subtitle;
        this.videos = environment.videos;
        this.lgPlay = environment.lgplay;
        this.poster = environment.poster;
        this.preload = 'auto';
        this.AppName = environment.AppNameSigla;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = "Editando Cadastro"; //this.Authorizer.formSubTitle; // 'Usuário';
        this.subtitlefrm = this.Authorizer.formSubTitle;
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.CodigoUsuarioSistema = this.Authorizer.CodigoUsuarioSistema;
        this.pathBook = "/assets/app/books/book.jpg";
        this.flagFiltroAvanzado = false;
        this.RowsPageDef = 100;
        this.PageNumber = 1;
        this.RowsPage = 5;
        this.Paginas = [];
        this.flagForm = false;
        this.collection = [];
        this.model = new Editoras;
        this.modeli = new Editoras;
        this.modelPesquisa = new Editoras;
        this.collectionUfs = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionEmpresaSituacao = [{
                CodigoUnidadeSituacao: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionEmpresaTipo = [{
                CodigoUnidadeSituacao: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionUfsRgRespOrgExp = [{
                CodigoBaseUF: 0,
                Nome: '',
                Sigla: ''
            }];
        this.collectionMunicipios = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0
            }];
        this.collectionMunicipiofilted = [{
                CodigoBaseUF: 0,
                CodigoBaseMunicipio: 0
            }];
        this.ComentarioLength = 0;
        this.collectionSegmentos = [{
                CodigoSegmento: '',
                Nome: ''
            }];
        this.permissoes = {
            Route: '',
            Ver: 0,
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0,
            Responder: 0
        }; // Permissoes do modulo para o usuario logado
        this.getObjectByValue = function (array, key, value) {
            return array.filter(function (object) {
                return object[key] === value;
            });
        };
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
        // vg-s1
        this.elem = ref.nativeElement;
        this.id = this.elem.id;
    }
    EditorasPage.prototype.ngOnInit = function () {
        // vg-s2
        // this.timer = TimerObservable.create(0, 10);
        this.getPermissoesModulo();
        this.consultarUFs();
        this.read(1, this.RowsPageDef);
    };
    EditorasPage.prototype.consultarUFs = function () {
        var _this = this;
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, function (resultado) {
            _this.collectionUfs = JSON.parse(atob(resultado.results));
            _this.collectionUfsRgRespOrgExp = JSON.parse(atob(resultado.results));
        });
    };
    EditorasPage.prototype.consultarMunicio = function (pCodigoBaseUF) {
        var _this = this;
        this.sendRequest('spCarregaMunicipios', {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: pCodigoBaseUF }
        }, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
            _this.collectionMunicipiofilted = _this.getObjectByValue(_this.collectionMunicipios, "CodigoBaseMunicipio", _this.model.CodigoBaseMunicipio);
            _this.model.Municipios = _this.collectionMunicipiofilted[0];
        });
    };
    EditorasPage.prototype.carregarSelectMunicipio = function (value) {
        var _this = this;
        this.model.CodigoBaseUF = value;
        // this.model.CodigoMunicipio = 0;
        var params = {
            StatusCRUD: 'READ',
            formValues: { CodigoBaseUF: this.model.CodigoBaseUF }
        };
        this.sendRequest('spCarregaMunicipios', params, function (resultado) {
            _this.collectionMunicipios = JSON.parse(atob(resultado.results));
        });
    };
    EditorasPage.prototype.selectChange = function (event, modelAttr) {
        this.model[modelAttr] = event.value[modelAttr];
        // console.log('select:', event.value);
    };
    EditorasPage.prototype.onPlayerReady = function (api) {
        var _this = this;
        // console.log('VideoApi:',api);
        this.api = api;
        this.isFullscreen = api.fsAPI.isFullscreen;
        // this.api.volume = 0;
        // this.api.play();
        // this.toggleFullscreen =  api.fsAPI.onChangeFullscreen; 
        this.api.getDefaultMedia().subscriptions.ended.subscribe(function () {
            // Set the video to the beginning
            _this.api.getDefaultMedia().currentTime = 0;
        });
    };
    EditorasPage.prototype.onUpdateTime = function (currentTime, duration) {
        // this.modelCursosFilmesComments.DurationEnd = currentTime;
    };
    EditorasPage.prototype.currentTimeAPI = function () {
        return this.api.time.current;
    };
    //------------------------------------------------
    // Eventos Angular
    //------------------------------------------------
    EditorasPage.prototype.ngAfterViewChecked = function () {
        // console.log("DetectChanges");
        this.cdRef.detectChanges();
        // if ( this.flagFormComment ) this.iComentario.setFocus();
    };
    EditorasPage.prototype.ngAfterContentInit = function () {
        // console.log(this.ngAfterContentInit);
    };
    EditorasPage.prototype.ngAfterContentChecked = function () {
        // console.log("Aconteceu....");    
    };
    EditorasPage.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['duration'].currentValue) {
            this.duration = changes['duration'].currentValue * 1000;
            this.time.total = this.duration;
            this.buffer.end = this.duration;
            this.buffered.end = function (end) { return _this.duration; };
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
        }
    };
    EditorasPage.prototype.isPortrait = function () {
        this.device = this.platform.platforms()[0];
        // this.alertService.presentToast(this.platform.platforms()[0]);
        if (this.platform.platforms()[0] === "android" ||
            // this.platform.platforms()[0] === "ipad" ||
            this.platform.platforms()[0] === "iphone") {
            if (this.flagForm) {
                // return (window.innerHeight > window.innerWidth);  
                if (!this.platform.isPortrait()) {
                    // this.toggleFullscreen(event);
                }
                return this.platform.isPortrait();
            }
        }
        else {
            return true;
        }
    };
    /*
    ngAfterViewInit(): void {
      this.api.fsAPI.onChangeFullscreen.subscribe((event) => {
        this.toggleFullscreen(event);
      });
    }
    */
    EditorasPage.prototype.toggleFullscreen = function ($event) {
        console.log($event);
    };
    EditorasPage.prototype.setCurrentVideo = function (source, type) {
        this.api.pause();
        this.sources = new Array();
        this.sources.push({
            src: source,
            type: type
        });
        this.api.getDefaultMedia().currentTime = 0;
    };
    EditorasPage.prototype.trackSelect = function ($event) {
        console.log($event);
        //this.collectionCursoFilmecomments.DurationBegin = this.api.currentTime;
    };
    EditorasPage.prototype.play = function () {
        var _this = this;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));
        this.timerSubs = this.timer.subscribe(function () {
            _this.currentTime += 10;
            _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
            if (_this.time.current >= _this.time.total) {
                _this.currentTime = 0;
                _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
                _this.timerSubs.unsubscribe();
            }
        });
    };
    Object.defineProperty(EditorasPage.prototype, "currentTime", {
        get: function () {
            return this.time.current;
        },
        set: function (seconds) {
            this.time.current = seconds;
        },
        enumerable: true,
        configurable: true
    });
    EditorasPage.prototype.pause = function () {
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.timerSubs.unsubscribe();
    };
    EditorasPage.prototype.onEnterCuePoint = function (e) {
        // console.log('EnterCuePoint:',e);
    };
    EditorasPage.prototype.onExitCuePoint = function (e) {
        // console.log('ExitCuePoint',e);
    };
    EditorasPage.prototype.getPermissoesModulo = function () {
        var _this = this;
        var permissaoModulo = this.Authorizer.permissoesUsuario.filter(function (item) {
            return (item.Route === _this.router.url);
        });
        if (permissaoModulo.length === 1) {
            this.permissoes = {
                Route: permissaoModulo[0].Route,
                Ver: permissaoModulo[0].Ver,
                Pesquisar: permissaoModulo[0].Pesquisar,
                Inserir: permissaoModulo[0].Inserir,
                Editar: permissaoModulo[0].Editar,
                Deletar: permissaoModulo[0].Deletar,
                Responder: permissaoModulo[0].Inserir
            };
        }
        else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    };
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    EditorasPage.prototype.sendRequest = function (procedure, params, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var paramsSend;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (typeof this.Authorizer.HashKey !== 'undefined') {
                    if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                        || ((params.StatusCRUD === 'QUERY') && (this.permissoes.Pesquisar > 0))
                        || (procedure === 'spCarregaUFs')
                        || (procedure === 'spCarregaMunicipios')
                    // || (procedure === 'spCursoFilmeComments')
                    /*
                    || (procedure === 'spSegmentos')
                    || (procedure === 'spCarregaGrupos')
                    */
                    ) {
                        paramsSend = {
                            StatusCRUD: params.StatusCRUD,
                            formValues: params.formValues,
                            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                            Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                        };
                        this.Authorizer.QueryStoreProc('Executar', procedure, paramsSend).then(function (res) {
                            var resultado = res[0];
                            try {
                                if (resultado.success) {
                                    next(resultado);
                                    /* if (procedure === 'spLivros') {
                                      this.alertService.showLoader(resultado.message, 1000);
                                    } */
                                }
                                else {
                                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: _this.subtitle, pMessage: resultado.message });
                                    _this.navCtrl.back();
                                }
                            }
                            catch (err) {
                                _this.alertService.presentAlert({
                                    pTitle: environment.AppNameSigla,
                                    pSubtitle: _this.subtitle,
                                    pMessage: 'Erro ao fazer a petição'
                                });
                            }
                        });
                    }
                    else {
                        this.alertService.presentAlert({
                            pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
                        });
                    }
                }
                else {
                    this.goBack();
                }
                return [2 /*return*/];
            });
        });
    };
    EditorasPage.prototype.salvar = function (form) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                params = {
                    StatusCRUD: this.model.CodigoEditora > 0 ? 'UPDATE' : 'CREATE',
                    formValues: this.model,
                };
                this.sendRequest('spEditoras', params, function (resultado) {
                    if (params.StatusCRUD === 'CREATE') {
                        _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                        _this.collectionFilter = _this.collection;
                    }
                    else if (params.StatusCRUD === 'UPDATE') {
                        _this.collectionFilter = _this.collection.map(function (item, index) {
                            if (item.CodigoEditora === _this.model.CodigoEditora) {
                                item = JSON.parse(atob(resultado.results))[0];
                            }
                            return item;
                        });
                        _this.collection = _this.collectionFilter;
                    }
                    // this.playForm(model);      
                    _this.flagForm = !(_this.flagForm);
                    _this.alertService.showLoader(resultado.message, 1000);
                });
                return [2 /*return*/];
            });
        });
    };
    EditorasPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "<strong> " + model.CursoDescricao + "</strong>!!!";
        alert.buttons = [
            {
                text: 'Desistir',
                role: 'cancel',
                cssClass: 'secondary',
                handler: function (blah) {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: 'Confirmar',
                handler: function () {
                    var params = {
                        StatusCRUD: 'DELETE',
                        formValues: model
                    };
                    _this.sendRequest('spEditoras', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoEditora === this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoMorador);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    EditorasPage.prototype.read = function (pPageNumber, pRowsPage) {
        var _this = this;
        // Obtendo a informação do banco de dados    
        var params = {
            StatusCRUD: 'READ',
            formValues: {
                pageNumber: pPageNumber,
                rowspPage: pRowsPage
            }
        };
        this.sendRequest('spEditoras', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
            _this.RecordCount = _this.collectionFilter[0].RecordCount;
            // this.showPages(this.PageNumber, this.RowsPage);
            // this.modelPesquisa.Pagina = this.paginas[0];
        });
    };
    EditorasPage.prototype.playForm = function (model) {
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
            this.modeli[key] = model[key];
        }
        this.flagForm = true;
    };
    EditorasPage.prototype.playFormClose = function () {
        this.flagForm = false;
    };
    EditorasPage.prototype.goBack = function () {
        if (this.flagForm) {
            // Se o formulario está ativo, então altera a flagForm para que mostre a lista
            this.flagForm = false;
        }
        else if (this.flagFiltroAvanzado) {
            // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
            this.flagFiltroAvanzado = false;
            this.collectionFilter = this.collection;
        }
        else {
            this.navCtrl.back();
        }
    };
    EditorasPage.prototype.formatMask = function (fieldName, Value, type) {
        this.modeli[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    EditorasPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    EditorasPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.NomeSocial.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    EditorasPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    EditorasPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    EditorasPage.prototype.mostrarPop = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopinfoComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (typeof data !== 'undefined') {
                            if (data.item === 'BUSCAR') {
                                this.flagFiltroAvanzado = true;
                                this.flagForm = false;
                                this.collectionFilter = [];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditorasPage.prototype.player = function (model) {
        // console.log(model);    
        this.playForm(model);
    };
    EditorasPage.prototype.edit = function (model) {
        // console.log(model);    
        this.playForm(model);
    };
    EditorasPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    /*
    public showPagination() {
      let tot: number;
      let pag: number;
      tot = this.collection[0].total;
  
      pag = tot / this.modelPesquisa.RowspPage;
      if (pag < 1) {
        pag = 1;
      }
  
      for (let i = 0; i < pag; i++) {
        let num: number;
        num = i + 1;
  
        if (i === 0) {
          this.paginas  = [
            {
              numero : num,
              nome: 'Página ' + num.toString()
            }
          ];
        } else {
          this.paginas.push( {
            numero : num,
            nome: 'Página ' + num.toString()
          });
        }
      }
      this.modelPesquisa.Pagina = this.paginas[0];
    }
    */
    EditorasPage.prototype.showPages = function (pPageNumber, pRowsPage) {
        this.Paginas = [];
        for (var i = pPageNumber; i < pRowsPage; i++) {
            this.Paginas.push({
                PageNumber: i
            });
        }
    };
    EditorasPage.prototype.selecionaPagina = function (numero) {
        if (numero < 100) {
            if ((numero + this.RowsPageDef) < this.RecordCount) {
                if ((numero > 0) || (this.PageNumber > 1)) {
                    this.PageNumber = numero - 1;
                }
                if (this.RecordCount > numero + this.RowsPageDef) {
                    this.PageNumber = numero;
                    this.RowsPage = numero + this.RowsPageDef;
                }
            }
            else {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
        }
        else if (numero === 1000) {
            this.PageNumber = 1;
            this.RowsPage = (this.RowsPageDef + 1);
        }
        else if (numero === 1001) {
            if (this.PageNumber <= (this.RowsPageDef + 1)) {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
            else {
                this.PageNumber = this.PageNumber - this.RowsPageDef;
                this.RowsPage = this.PageNumber + this.RowsPageDef;
            }
        }
        else if (numero === 1002) {
            if (this.PageNumber + this.RowsPageDef >= this.RecordCount) {
                this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
                this.RowsPage = this.RecordCount + 1;
            }
            else {
                this.PageNumber = this.PageNumber + this.RowsPageDef;
                this.RowsPage = this.RowsPage + this.RowsPageDef;
            }
        }
        else if (numero === 1003) {
            this.RowsPage = this.RecordCount + 1;
            this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
        }
        this.read(this.PageNumber, this.RowsPageDef);
        // console.log('Número:' + numero + ', Página:' + this.PageNumber + ', Linha:' + this.RowsPage)
    };
    tslib_1.__decorate([
        ViewChild('txtComentario'),
        tslib_1.__metadata("design:type", Object)
    ], EditorasPage.prototype, "iComentario", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], EditorasPage.prototype, "duration", void 0);
    EditorasPage = tslib_1.__decorate([
        Component({
            selector: 'app-editoras',
            templateUrl: './editoras.page.html',
            styleUrls: ['./editoras.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router,
            Platform])
    ], EditorasPage);
    return EditorasPage;
}());
export { EditorasPage };
//# sourceMappingURL=editoras.page.js.map